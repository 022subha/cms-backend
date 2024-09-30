import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../utils/errorHandler";

export const errorMiddleware = (
  err: ErrorHandler,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { statusCode = 500, message = "Internal Server Error", success } = err;

  console.error(
    "\n<================ Somwething Went Wrong ================>\n",
    err
  );

  res.status(statusCode).json({
    success,
    message,
  });
};
