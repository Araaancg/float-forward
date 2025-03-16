import { Service } from "typedi";
import { UserService } from "./user.service";
import { TokenService } from "./token.service";
import { IUser } from "../../common/types/user.types";
import { ITokens } from "../../common/types/token.types";
import EncryptionManager from "../../common/helpers/encryption-manager";
import { ApiError } from "../../common/middlewares/error-handler";
import httpStatus from "http-status";
import { OAuth2Client } from "google-auth-library";
import actionLog from "../../common/helpers/actionLog";

@Service()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private encryptionManager: EncryptionManager
  ) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async register({
    email,
    name,
    password,
    confirmPassword,
  }: {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
  }): Promise<{ success: boolean; user?: IUser; tokens?: ITokens }> {
    if (password !== confirmPassword) {
      throw new ApiError(httpStatus.CONFLICT, "Passwords must be the same");
    }

    const userExists = await this.userService.getByEmail(email);
    if (userExists) {
      throw new ApiError(
        httpStatus.CONFLICT,
        "Email is already in use, log in instead"
      );
    }

    const encryptedPassword = await this.encryptionManager.hashPassword(
      password
    );

    const user = await this.userService.create({
      email,
      name,
      password: encryptedPassword,
      authProvider: "credentials",
    });

    const tokens = await this.tokenService.generateAuthTokens(user);

    // if everything goes perfectly then send the verification email
    // const verifyEmailToken = await this.tokenService.generateVerifyEmailToken(user)
    // console.log('verifyEmailToken', verifyEmailToken)

    // const result = this.sendVerificationEmail(user.email, verifyEmailToken)

    return {
      success: true,
      user,
      ...tokens,
    };
  }

  async loginCredentials({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "User not found, please register instead"
      );
    }

    const equalPasswords = await this.encryptionManager.comparePasswords(
      password,
      user.password
    );
    if (!equalPasswords) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Passwords must be the same xd"
      );
    }

    const tokens = await this.tokenService.generateAuthTokens(user);

    return {
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        profilePicture: user.profilePicture,
        authProvider: user.authProvider,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      ...tokens,
    };
  }

  async loginGoogle({
    email,
    name,
    picture,
    token,
  }: {
    email: string;
    name: string;
    picture: string;
    token: string;
  }) {
    try {
      // Verify the Google token
      const payload = await this.verifyGoogleToken(token);

      // Verify that the email from the token matches the provided email
      if (payload.email !== email) {
        throw new ApiError(
          httpStatus.CONFLICT,
          "Token email mismatch: email from token and email provided are not the same"
        );
      }

      // Check if token is expired
      const expirationTime = payload.exp ? payload.exp * 1000 : 0; // Convert to milliseconds
      if (Date.now() >= expirationTime) {
        throw new ApiError(httpStatus.CONFLICT, "Google token has expired");
      }

      // Use verified data from the token instead of passed parameters
      email = payload.email;
      name = payload.name || name;
      picture = payload.picture || picture;
    } catch (error: any) {
      throw new ApiError(
        httpStatus.CONFLICT,
        `Google authentication failed: ${error.message}`
      );
    }

    let user = await this.userService.getByEmail(email);
    if (!user) {
      // create new user in db
      user = await this.userService.create({
        email,
        name,
        authProvider: "google",
        profilePicture: picture,
      });
    }

    const tokens = await this.tokenService.generateAuthTokens(user);

    return {
      success: true,
      user,
      ...tokens,
    };
  }

  async loginCheck({ email, password }: { email: string; password: string }) {
    try {
      if (!email || !password) {
        actionLog("ERROR", "Email or password not provided");
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Email or password not provided, please fill in the form."
        );
      }

      const user = await this.userService.getByEmail(email);
      if (!user) {
        actionLog("ERROR", "User not found");
        throw new ApiError(
          httpStatus.NOT_FOUND,
          "User not found, please register instead."
        );
      }

      const equalPasswords = await this.encryptionManager.comparePasswords(
        password,
        user.password
      );
      if (!equalPasswords) {
        actionLog("ERROR", "Email or password incorrect");
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Email or password incorrect, please try again."
        );
      }
      return {
        success: true,
      };
    } catch (e: any) {
      actionLog("ERROR", `Error checking credentials: ${e.message}`);

      if (e instanceof ApiError) {
        // rethrow the error if it is a custom error
        throw e;
      }
      // else make it custom
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Something went wrong checking credentials, please try again later."
      );
    }
  }

  async registerCheck({
    email,
    name,
    password,
    confirmPassword,
  }: {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
  }) {
    try {
      if (!email || !name || !password || !confirmPassword) {
        actionLog("ERROR", "There is some missing data");
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "There is some missing data, please fill the form fully."
        );
      }

      const user = await this.userService.getByEmail(email);
      if (user) {
        actionLog("ERROR", "Email is already in use");
        throw new ApiError(
          httpStatus.NOT_FOUND,
          "Email is already in user, log in instead."
        );
      }

      const equalPasswords = password === confirmPassword;
      if (!equalPasswords) {
        actionLog("ERROR", "Passwords are not the same");
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Passwords are no the same, please try again."
        );
      }

      return {
        success: true,
      };
    } catch (e: any) {
      actionLog("ERROR", `Error checking register data: ${e.message}`);

      if (e instanceof ApiError) {
        // rethrow the error if it is a custom error
        throw e;
      }
      // else make it custom
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Something went wrong register data, please try again later."
      );
    }
  }

  async verifyGoogleToken(token: string) {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (!payload) {
        throw new ApiError(httpStatus.CONFLICT, "Invalid Google token payload");
      }

      return payload;
    } catch (error) {
      throw new ApiError(httpStatus.CONFLICT, "Invalid Google token");
    }
  }

  async refresh(refreshToken: string) {
    try {
      console.log("verifying token...");
      const payload = await this.tokenService.verifyToken(
        refreshToken,
        "refresh"
      );
      console.log("token verified, generating new tokens...");
      const tokens = await this.tokenService.generateAuthTokens(payload.token);
      return {
        success: true,
        ...tokens,
      };
    } catch (e) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Refresh token expired, please log in again"
      );
    }
  }

  async logout(user: any) {}

  async verifyEmail(emailToken: any) {
    try {
      const payload = await this.tokenService.verifyToken(
        emailToken,
        "verifyEmail"
      );
      const tokens = await this.tokenService.generateAuthTokens(payload.token);
      return {
        success: true,
        ...tokens,
      };
    } catch (e) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "VerifyEmail token expired, please log in again"
      );
    }
  }

  async sendVerificationEmail(email: string, verifyEmailToken: any) {
    //   try {
    //     const payload = await this.tokenService.verifyToken(verifyEmailToken, "verifyEmail")
    //     const tokens = await this.tokenService.generateAuthTokens(payload.token)
    //     return {
    //       success: true,
    //       ...tokens
    //     }
    //   } catch (e) {
    //     throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Something went wrong when sending the verification email")
    //   }
  }
}
