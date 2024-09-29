export class ErrorHandler extends Error {
  message: string;
  success: boolean;
  statusCode: number;

  constructor(statusCode: number, message = "Something went wrong") {
    super(message);
    this.success = false;
    this.message = message;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
