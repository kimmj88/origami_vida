import { NextFunction, Request, Response } from "express";
import { logger } from "common";

export class HttpException extends Error {
  status: number;
  responseData: any;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  logger.error(message);
  response.status(status).json({ message, result: false });
}
