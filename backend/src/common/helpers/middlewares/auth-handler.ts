import { Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import { ApiError } from './error-handlers'
import { GeneralTypes } from '../../../common/types/general'

/**
 * Get token from request header
 * @param req IReques
 * @returns Token
 */
const getTokenFromHeader = (req: GeneralTypes.IRequest): string => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1]
  }

  return null
}

/**
 * Auth middleware
 * @param public_key Public key form the sign
 * @returns Jwt verify response
 */
export const auth =
  (publicKey: string) =>
    (req: GeneralTypes.IRequest, res: Response, next: NextFunction): void => {
      const token = getTokenFromHeader(req)
      jwt.verify(token, publicKey, function (err, decoded: GeneralTypes.IToken) {
        if (err) {
          return next(
            new ApiError(httpStatus.UNAUTHORIZED, err.message || 'UNAUTHORIZED')
          )
        }
        req.token = decoded
        next()
      })
    }
