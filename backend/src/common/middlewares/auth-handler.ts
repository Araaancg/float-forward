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
    const token = req.headers.authorization.split(" ")[1]
    // actionLog("INFO", `Token retrieved from header successfully: ${token.slice(0,20)}...`)
    return token;
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
    console.log("\n")
    // actionLog("PROC", "Verifying token in the backend to access API")
    const token = getTokenFromHeader(req);
    jwt.verify(token, publicKey, function (err, decoded) {
      if (err) {
        // actionLog("ERROR", `Token could not be verified: ${err}`)
        return next(
          new ApiError(httpStatus.UNAUTHORIZED, `Authentication failed: ${err}`)
        );
      }
      req.token = decoded;
      // actionLog("INFO", "Token verified succesfully")
      next();
    });
  };
