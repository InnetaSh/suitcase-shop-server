import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

export interface AuthenticatedRequestWithCorrelation extends Request {
  correlationId?: string;
}

export const correlationIdMiddleware = (req: AuthenticatedRequestWithCorrelation, res: Response, next: NextFunction) => {
  const correlationId = (req.headers['x-correlation-id'] as string) || randomUUID();
  
  req.correlationId = correlationId;
  res.setHeader('x-correlation-id', correlationId);

  next();
};