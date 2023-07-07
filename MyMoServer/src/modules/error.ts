import { Request, Response } from 'express';
import 'express-async-errors';

export default class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export async function errorPageNotFound() {
  throw new ApiError(404, 'Page Not Found');
}

export async function errorHandler(error: ApiError, req: Request, res: Response) {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'server error';

  res.status(statusCode).send(message);
}
