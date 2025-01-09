import { Response, NextFunction } from "express";
import httpStatus from "http-status";
import { ApiError } from "./error-handler";
import jwt from "jsonwebtoken";

/**
 * Get token from request header
 * @param req IReques
 * @returns Token
 */
const getTokenFromHeader = (req: any): string => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return "";
};

/**
 * Auth middleware
 * @param public_key Public key form the sign
 * @returns Jwt verify response
 */
export const auth = (publicKey: string) =>
  (req: any, res: Response, next: NextFunction): void => {
    const token = getTokenFromHeader(req);
    jwt.verify(token, publicKey, function (err, decoded) {
      if (err) {
        return next(
          new ApiError(httpStatus.UNAUTHORIZED, err.message || "Unauthorized")
        );
      }
      req.token = decoded;
      next();
    });
  };
