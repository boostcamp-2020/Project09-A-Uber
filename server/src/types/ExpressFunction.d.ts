import { Request, Response, NextFunction } from 'express';

export type ExpressFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void> | void;
