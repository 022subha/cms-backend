import jwt from "jsonwebtoken";
import { ICreateActivationTokenResponseBody } from "../types/auth.types";

export const createActivationToken = (
  payload: object
): ICreateActivationTokenResponseBody => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const secret = process.env.ACTIVATION_TOKEN_SECRET;
  const options = { expiresIn: "5m" };

  const token = jwt.sign(payload, secret, options);

  return { token, otp };
};
