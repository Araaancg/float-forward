import jwt from "jsonwebtoken";
import moment from "moment";
import mongoose, { AnyObject, Model, ObjectId } from "mongoose";
import Container, { Service } from "typedi";
import httpStatus from "http-status";
import { JSON_WEB_TOKENS } from "../../common/config";
import { ApiError } from "../../common/middlewares/error-handler";

@Service()
export class TokenService {
  private sessionModel: Model<any, any>;

  constructor() {
    this.sessionModel = Container.get("Session");
  }

  generateToken(
    data: {
      user: ObjectId;
    },
    expires = moment().add(10, "m"),
    type: any
  ): string {
    const payload = {
      sub: data.user,
      aud: ["https://localhost:8080"], // audience
      iss: "https://localhost:8080", // issuer
      iat: moment().unix(), // issued at
      exp: expires.unix(), // expires at
      type,
    };

    return jwt.sign(payload, JSON_WEB_TOKENS.PRIVATE_KEY!, {
      algorithm: "RS256",
    });
  }

  async saveToken(
    token: string,
    user: mongoose.ObjectId,
    expires: moment.Moment,
    type: any,
    blacklisted = false
  ) {
    await this.sessionModel.create([
      {
        token,
        user: user,
        type,
        expires: expires.toDate(),
        blacklisted,
      },
    ]);
  }

  async verifyToken(
    token: string,
    type: any
  ): Promise<{
    token: AnyObject;
  }> {
    let payload;

    try {
      payload = jwt.verify(token, JSON_WEB_TOKENS.PRIVATE_KEY!);
      console.log("payload", payload)
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid token");
    }

    let tokenDoc = null;

    if (type === "refresh") {
      tokenDoc = await this.sessionModel.findOne({
        token,
        type,
        blacklisted: false,
      });
    } else {
      tokenDoc = await this.sessionModel.findOne({
        token,
        type,
        user: payload.sub,
        blacklisted: false,
      });
    }

    if (!tokenDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, "Token not found");
    }

    return { token: tokenDoc };
  }

  async generateAuthTokens(user: any): Promise<any> {
    const accessTokenExpires = moment().add(
      JSON_WEB_TOKENS.accessExpirationMinutes,
      "minutes"
    );

    const accessToken = this.generateToken(
      {
        user: user._id,
      },
      accessTokenExpires,
      "access"
    );

    const refreshTokenExpires = moment().add(
      JSON_WEB_TOKENS.refreshExpirationDays,
      "days"
    );

    const refreshToken = this.generateToken(
      user._id,
      refreshTokenExpires,
      "refresh"
    );

    await this.saveToken(
      refreshToken,
      user._id,
      refreshTokenExpires,
      "refresh"
    );

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  }

  async generateVerifyEmailToken(
    user: Partial<any>
    // session: mongoose.ClientSession
  ): Promise<string> {
    const expires = moment().add(
      JSON_WEB_TOKENS.verifyEmailExpirationMinutes,
      "minutes"
    );

    const verifyEmailToken = this.generateToken(
      { user: user._id },
      expires,
      "verifyEmail"
    );

    await this.saveToken(verifyEmailToken, user._id, expires, "verifyEmail");

    return verifyEmailToken;
  }
}
