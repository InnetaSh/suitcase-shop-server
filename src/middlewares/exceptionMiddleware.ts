import { Request, Response, NextFunction } from 'express';
import { BaseException } from '../errors/BaseException.js';

export const exceptionMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('🔥 Exception Caught:', err);

  if (err instanceof BaseException) {
    return res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  return res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};