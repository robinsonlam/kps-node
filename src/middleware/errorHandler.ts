import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode: number;
  isOperational?: boolean;
}

export const createError = (message: string, statusCode: number): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // TODO: Implement proper error handling
  // - Handle different types of errors (validation, not found, server errors)
  // - Return appropriate HTTP status codes
  // - Format error responses consistently
  // - Log errors appropriately

  if (err.name === 'ValidationError') {
    res.status(400).json({
      error: {
        message: (err as any)?.details[0].message || 'Request Validation Error', // ! Remove any...
        timestamp: new Date().toISOString(),
      },
    })
  }

  // Default error response
  res.status(err.statusCode || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.statusCode || 500,
      timestamp: new Date().toISOString(),
    },
  });
}; 