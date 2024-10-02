import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import zod from "zod";
import { asyncHandler } from "../utils/asyncHandler";
import { ErrorHandler } from "../utils/errorHandler";
import { ResponseHandler } from "../utils/responseHandler";
import {
  ICreateActivationTokenResponseBody,
  IRegisterBody,
} from "../types/auth.types";
import { HTTP_STATUS } from "../constants";
import { createActivationToken } from "../utils/createActivationToken";
import { sendMail } from "../utils/sendMail";
import { activationMail } from "../mails/activation.mail";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%^&\\*])(?=.{8,})/;

const registerBodySchema = zod.object({
  firstName: zod.string({ message: "First name is required." }).trim(),
  lastName: zod.string({ message: "Last name is required." }).trim(),
  email: zod
    .string({ message: "Email is required." })
    .trim()
    .regex(emailRegex, {
      message: "Please provide a valid email address.",
    }),
  password: zod
    .string({ message: "Password is required." })
    .regex(strongPasswordRegex, {
      message:
        "Password is too weak! Password must contain a lowercase letter, an uppercase letter, a number, and a special character.",
    }),
});

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const response = registerBodySchema.safeParse(req.body as IRegisterBody);
    if (!response.success) {
      return next(new ErrorHandler(422, response.error.issues[0].message));
    }

    const { firstName, lastName, email, password } = response.data;

    const existingUser = await User.findOne({ email }).select("+password");
    if (existingUser?.password) {
      return next(
        new ErrorHandler(HTTP_STATUS.CONFLICT, "User already exists.")
      );
    }

    const user = {
      ...existingUser,
      firstName,
      lastName,
      email,
      password,
    };

    const { token, otp } = createActivationToken(
      user
    ) as ICreateActivationTokenResponseBody;

    if (!token || !otp) {
      return next(
        new ErrorHandler(
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          "Error creating activation token."
        )
      );
    }

    const mailBody = {
      name: firstName,
      otp,
    };

    await sendMail(email, "Verify Your Email", activationMail(mailBody));

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ResponseHandler(
          HTTP_STATUS.OK,
          token,
          `Please check your email: ${user.email} to activate your account`
        )
      );
  }
);
