class ErrorHandler extends Error {
  data: any;
  errors: any;
  stack: string;
  message: string;
  success: boolean;
  statusCode: number;

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.data = null;
    this.stack = stack;
    this.success = false;
    this.errors = errors;
    this.message = message;
    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ErrorHandler };
