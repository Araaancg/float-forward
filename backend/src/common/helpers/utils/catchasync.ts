import { NextFunction, Response } from 'express'
import { GeneralTypes } from '../../../common/types/general'

export const catchAsync =
  (
    fn: (
      req: GeneralTypes.IRequest,
      res: Response,
      next: NextFunction
    ) => unknown
  ) =>
    (req: GeneralTypes.IRequest, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch((err) => next(err))
    }
