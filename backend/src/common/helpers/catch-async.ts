import { NextFunction, Response } from 'express'

export const catchAsync =
  (
    fn: (
      req: any,
      res: Response,
      next: NextFunction
    ) => unknown
  ) =>
    (req: any, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch((err) => next(err))
    }