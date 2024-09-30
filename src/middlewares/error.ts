import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../utils/errorHandler";
import { HTTP_STATUS } from "../constants";

export const errorMiddleware = (
  err: ErrorHandler,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const {
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message = "Internal Server Error",
    success,
  } = err;

  console.error(
    "\n<================ Somwething Went Wrong ================>\n",
    err
  );

  res.status(statusCode).json({
    success,
    message,
  });
};
