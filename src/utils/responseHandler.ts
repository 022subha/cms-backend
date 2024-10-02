class ResponseHandler {
  statusCode: number;
  message: string;
  data: any;
  success: boolean;

  constructor(statusCode: number, data: any, message = "Success") {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}

export { ResponseHandler };
