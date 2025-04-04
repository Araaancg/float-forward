import httpStatus from 'http-status'
import { NextFunction, Request, Response } from 'express'

export const errorConverter =
  () =>
    (err: Error, req: Request, res: Response, next: NextFunction): void => {
      let error = err
      if (!(error instanceof ApiError)) {
        const statusCode =
          (error as ApiError).statusCode || httpStatus.INTERNAL_SERVER_ERROR
        const message = error.message
        error = new ApiError(statusCode, message, false, err.stack)
      }
      next(error)
    }

export const errorHandler =
  (isProd: boolean) =>
    (err: ApiError, req: Request, res: Response, next: NextFunction) => {
      let { statusCode, message } = err

      if (isProd && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
      }

      res.locals.errorMessage = err.message

      const response = {
        success: false,
        code: statusCode,
        message
      }

      res.status(statusCode).send(response)
    }

export class ApiError extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(
    statusCode: number,
    message: string,
    isOperational = true,
    stack = ''
  ) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}