import { Service } from "typedi";
import { UserService } from "./user.service";
import { TokenService } from "./token.service";
import { IUser } from "../../common/types/user.types";
import { ETokenTypes, ITokens } from "../../common/types/token.types";
import EncryptionManager from "../../common/helpers/encryption-manager";
import { ApiError } from "../../common/middlewares/error-handler";
import httpStatus from "http-status";
import { OAuth2Client } from "google-auth-library";
import {
  sendResetPasswordEmail,
  sendVerifyEmail,
} from "../../common/helpers/nodemailer/nodemailer-helper";
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
    try {
      actionLog("PROCESS", "AUTH", "Registering new user...");
      if (password !== confirmPassword) {
        actionLog("ERROR", "AUTH", "Passwords must be the same");
        throw new ApiError(httpStatus.CONFLICT, "Passwords must be the same");
      }

      const userExists = await this.userService.getByEmail(email);
      if (userExists) {
        actionLog("ERROR", "AUTH", "Email already in use");
        throw new ApiError(
          httpStatus.CONFLICT,
          "Email is already in use, log in instead"
        );
      }
      actionLog("PROCESS", "AUTH", "Encrypting password...");
      const encryptedPassword = await this.encryptionManager.hashPassword(
        password
      );

      const user = (
        await this.userService.create({
          email,
          name,
          password: encryptedPassword,
          authProvider: "credentials",
        })
      ).data;

      actionLog("SUCCESS", "AUTH", "User registered correctly");
      actionLog("PROCESS", "AUTH", "Generating auth tokens...");
      const tokens = await this.tokenService.generateAuthTokens(user);
      actionLog("SUCCESS", "AUTH", "Auth tokens generated successfully");

      // if everything goes perfectly then send the verification email
      actionLog("PROCESS", "AUTH", "Generating verify email token...");
      const verifyEmailToken = await this.tokenService.generateVerifyEmailToken(
        user
      );
      actionLog("PROCESS", "AUTH", "Sending email...");
      sendVerifyEmail(user.email, user.name, verifyEmailToken);
      actionLog("SUCCESS", "AUTH", "Verify email sent correctly");

      return {
        success: true,
        user,
        ...tokens,
        verifyEmail: verifyEmailToken,
      };
    } catch (e) {
      actionLog(
        "ERROR",
        "AUTH",
        `Something went wrong when registering the user: ${e}`
      );
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong when registering the user: ${e}`
      );
    }
  }

  async loginCredentials({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      actionLog("PROCESS", "AUTH", "Logging user with credentials...");
      if (!email || !password) {
        actionLog("ERROR", "AUTH", "Email or password missing");
        throw new ApiError(httpStatus.BAD_REQUEST, "Email or password missing");
      }
      const user = await this.userService.getByEmail(email);
      if (!user) {
        actionLog("ERROR", "AUTH", "User not registered in db");
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
        actionLog("ERROR", "AUTH", "Passwords must be the same");
        throw new ApiError(
          httpStatus.CONFLICT,
          "Passwords must be the same"
        );
      }

      actionLog("INFO", "AUTH", "Username and password are correct");
      
      actionLog("PROCESS", "TOKEN", "Generating auth tokens...");
      const tokens = await this.tokenService.generateAuthTokens(user);
      actionLog("SUCCESS", "TOKEN", "Auth tokens generated successfully");
      
      actionLog("SUCCESS", "AUTH", "User logged in correctly");
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
    } catch (e) {
      actionLog(
        "ERROR",
        "AUTH",
        `Something went wrong when logging the user with credentials: ${e}`
      );
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong when logging the user with credentials: ${e}`
      );
    }
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
      actionLog("PROCESS", "AUTH", "Logging in user with Google...");
      actionLog("PROCESS", "AUTH", "Verifying Google's token...");
      const payload = await this.verifyGoogleToken(token);

      // Verify that the email from the token matches the provided email
      if (payload.email !== email) {
        actionLog("ERROR", "AUTH", "Google's token could not be verified...");
        throw new ApiError(
          httpStatus.CONFLICT,
          "Token email mismatch: email from token and email provided are not the same"
        );
      }
      actionLog("PROCESS", "AUTH", "Checking if token has expired...");
      // Check if token is expired
      const expirationTime = payload.exp ? payload.exp * 1000 : 0; // Convert to milliseconds
      if (Date.now() >= expirationTime) {
        actionLog("ERROR", "AUTH", "Google token has expired");
        throw new ApiError(httpStatus.UNAUTHORIZED, "Google token has expired");
      }

      // Use verified data from the token instead of passed parameters
      email = payload.email;
      name = payload.name || name;
      picture = payload.picture || picture;
      actionLog("SUCCESS", "AUTH", "Google token verified correctly");
    } catch (error: any) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Google authentication failed: ${error.message}`
      );
    }
    actionLog("PROCESS", "AUTH", "Verifying if user exists in db...");
    let user = await this.userService.getByEmail(email);
    if (!user) {
      actionLog("INFO", "AUTH", "User does not exist in db");
      actionLog("PROCESS", "AUTH", "Creating user in db with Google's info...");
      user = await this.userService.create({
        email,
        name,
        authProvider: "google",
        profilePicture: picture,
        isVerified: true,
      });
      actionLog("SUCCESS", "AUTH", "User created successfully");
    }
    actionLog("PROCESS", "AUTH", "Generating auth tokens...");
    const tokens = await this.tokenService.generateAuthTokens(user);
    actionLog("SUCCESS", "AUTH", "Auth tokens generated successfully");
    actionLog("SUCCESS", "AUTH", "Google Log In completed successfully");

    return {
      success: true,
      user,
      ...tokens,
    };
  }

  async loginCheck({ email, password }: { email: string; password: string }) {
    try {
      actionLog("PROCESS", "AUTH", "Checking login information...");
      if (!email || !password) {
        actionLog("ERROR", "AUTH", "Email or password not provided");
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Email or password not provided, please fill in the form."
        );
      }

      actionLog("PROCESS", "AUTH", "Checking if user exists...");
      const user = await this.userService.getByEmail(email);
      if (!user) {
        actionLog("ERROR", "AUTH", "User not found");
        throw new ApiError(
          httpStatus.NOT_FOUND,
          "User not found, please register instead."
        );
      }

      actionLog("PROCESS", "AUTH", "Checking passwords are the same...");
      const equalPasswords = await this.encryptionManager.comparePasswords(
        password,
        user.password
      );
      if (!equalPasswords) {
        actionLog("ERROR", "AUTH", "Email or password incorrect");
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Email or password incorrect, please try again."
        );
      }
      actionLog("SUCCESS", "AUTH", "Login information is correct");
      return {
        success: true,
      };
    } catch (e: any) {
      actionLog("ERROR", "AUTH", `Error checking credentials: ${e.message}`);

      if (e instanceof ApiError) {
        // rethrow the error if it is a custom error
        throw e;
      }
      // else make it custom
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Error checking credentials: ${e.message}`
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
      actionLog("PROCESS", "AUTH", "Checking register data...");
      if (!email || !name || !password || !confirmPassword) {
        actionLog("ERROR", "AUTH", "There is some missing data");
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "There is some missing data, please fill the form fully."
        );
      }

      const user = await this.userService.getByEmail(email);
      if (user) {
        actionLog("ERROR", "AUTH", "Email is already in use");
        throw new ApiError(
          httpStatus.NOT_FOUND,
          "Email is already in user, log in instead."
        );
      }

      const equalPasswords = password === confirmPassword;
      if (!equalPasswords) {
        actionLog("ERROR", "AUTH", "Passwords are not the same");
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Passwords are no the same, please try again."
        );
      }
      actionLog("SUCCESS", "AUTH", "Register information is valid and correct");
      return {
        success: true,
      };
    } catch (e: any) {
      actionLog(
        "ERROR",
        "AUTH",
        `Something went wrong when checking register data: ${e.message}`
      );

      if (e instanceof ApiError) {
        // rethrow the error if it is a custom error
        throw e;
      }
      // else make it custom
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong when checking register data: ${e.message}`
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
      actionLog("PROCESS", "AUTH", "Refreshing access tokens...");
      if (!refreshToken) {
        actionLog("ERROR", "AUTH", "Refresh token not provided");
        throw new ApiError(httpStatus.CONFLICT, "Refresh token not provided");
      }
      actionLog("PROCESS", "AUTH", "Verifying refresh token...");
      const payload = await this.tokenService.verifyToken(
        refreshToken,
        ETokenTypes.REFRESH_TOKEN
      );
      actionLog("SUCCESS", "AUTH", "Refresh token verified correctly");
      actionLog("PROCESS", "AUTH", "Generating new auth tokens...");
      const tokens = await this.tokenService.generateAuthTokens(payload.token);
      actionLog("SUCCESS", "AUTH", "Auth tokens generated successfully");
      return {
        success: true,
        ...tokens,
      };
    } catch (e) {
      actionLog(
        "ERROR",
        "AUTH",
        `Something went wrong when refreshing the access tokens: ${e}`
      );
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        `Something went wrong when refreshing the access tokens: ${e}`
      );
    }
  }

  async logout(user: any) {}

  async verifyEmail(verifyEmailToken: string, email: string) {
    actionLog("PROCESS", "AUTH", "Verifying email...");
    if (!email || !verifyEmailToken) {
      actionLog("ERROR", "AUTH", "c");
      throw new ApiError(httpStatus.BAD_REQUEST, "Email or token not provided");
    }
    const user = await this.userService.getByEmail(email);
    if (!user) {
      actionLog("ERROR", "AUTH", "User not found");
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    try {
      actionLog("PROCESS", "AUTH", "Verifying token...");
      const isTokenValid = await this.tokenService.verifyToken(
        verifyEmailToken,
        ETokenTypes.VERIFY_EMAIL_TOKEN
      );
      if (!isTokenValid) {
        actionLog("ERROR", "AUTH", "Token is not valid");
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "verifyEmail token is not valid"
        );
      }

      await this.userService.update(user._id.toString()!, { isVerified: true });
      actionLog("SUCCESS", "AUTH", "User verified successfully");
      return {
        success: true,
      };
    } catch (e) {
      actionLog(
        "ERROR",
        "AUTH",
        `Something went wrong when verifying the user: ${e}`
      );
      if (e instanceof ApiError) {
        // rethrow the error if it is a custom error
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong when verifying the user: ${e}`
      );
    }
  }

  async resendVerifyEmail(user: string): Promise<any> {
    const _user = (await this.userService.get({ _id: user })).data[0];
    if (!_user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
    }

    // if everything goes perfectly then send the verification email
    const verifyEmailToken = await this.tokenService.generateVerifyEmailToken(
      _user
    );
    sendVerifyEmail(_user.email, _user.name, verifyEmailToken);

    return {
      success: true,
      verifyEmail: verifyEmailToken,
    };
  }

  async forgotPassword(email: string) {
    try {
      actionLog("PROCESS", "AUTH", "Forgot password service...");
      if (!email) {
        actionLog("ERROR", "AUTH", "Email was not provided");
        throw new ApiError(httpStatus.BAD_REQUEST, "Email was not provided");
      }
      const user: IUser = await this.userService.getByEmail(email);
      if (!user) {
        actionLog(
          "ERROR",
          "AUTH",
          "User not found. Email is not registered in the platform"
        );
        throw new ApiError(
          httpStatus.NOT_FOUND,
          "User not found. Email is not registered in the platform"
        );
      }
      if (user.authProvider !== "credentials") {
        actionLog("ERROR", "AUTH", "User's provider is not credentials");
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "User's provider is not credentials"
        );
      }
      actionLog("PROCESS", "AUTH", "Generating reset password token...");
      const resetPasswordToken =
        await this.tokenService.generateResetPasswordToken(user);
      actionLog("PROCESS", "AUTH", "Sending reset password email...");
      sendResetPasswordEmail(email, user.name, resetPasswordToken);
      actionLog("SUCCESS", "AUTH", "Email sent correctly");

      return {
        success: true,
        data: resetPasswordToken,
      };
    } catch (e) {
      actionLog(
        "ERROR",
        "AUTH",
        `Something went wrong when resetting the password ${e}`
      );
      if (e instanceof ApiError) {
        // rethrow the error if it is a custom error
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong when resetting the password ${e}`
      );
    }
  }

  async resetPassword(
    resetPasswordToken: any,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    actionLog("PROCESS", "AUTH", "Resetting password...");
    if (!email || !resetPasswordToken || !password || !confirmPassword) {
      actionLog("ERROR", "AUTH", "All information was not provided");
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "All information was not provided"
      );
    }
    const user = await this.userService.getByEmail(email);
    if (!user) {
      actionLog("ERROR", "AUTH", "User not found");
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    if (password !== confirmPassword) {
      actionLog("ERROR", "AUTH", "Passwords must be the same");
      throw new ApiError(httpStatus.BAD_REQUEST, "Passwords must be the same");
    }

    try {
      actionLog("PROCESS", "AUTH", "Verifying resetPassword token...");
      const isTokenValid = await this.tokenService.verifyToken(
        resetPasswordToken,
        ETokenTypes.RESET_PASSWORD_TOKEN
      );
      if (!isTokenValid) {
        actionLog("ERROR", "AUTH", "Reset password token is not valid");
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "resetPassword token is not valid"
        );
      }
      actionLog("PROCESS", "AUTH", "Encrypting passwords...");
      const encryptedPassword = await this.encryptionManager.hashPassword(
        password
      );

      await this.userService.update(user._id!, { password: encryptedPassword });
      actionLog("SUCCESS", "AUTH", "Password resetted successfully");
      return {
        success: true,
      };
    } catch (e) {
      if (e instanceof ApiError) {
        // rethrow the error if it is a custom error
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong when resetting the password ${e}`
      );
    }
  }
}
