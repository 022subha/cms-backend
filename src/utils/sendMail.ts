import nodemailer from "nodemailer";
import { ErrorHandler } from "./errorHandler";
import { HTTP_STATUS } from "../constants";

export const sendMail = async (to: string, subject: string, text: string) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    } as nodemailer.TransportOptions);

    let mailOptions = {
      from: "Ediary",
      to: to,
      subject: subject,
      html: text,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(
      "\n<================ Error in sending email ================>\n",
      error
    );
    throw new ErrorHandler(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      "Error in sending email."
    );
  }
};
