import { Service } from "typedi";
import httpStatus from "http-status";
import { catchAsync } from "../../common/helpers/catch-async";
import { ApiError } from "../../common/middlewares/error-handler";
import { AuthService } from "../services/auth.service";
import actionLog from "../../common/helpers/actionLog";

// https://github.com/nextauthjs/next-auth/issues/9900

@Service()
export class AuthController {
  constructor(private authService: AuthService) {}

  register = catchAsync(async (req, res) => {
    const { email, name, password, confirmPassword, check } = req.body;

    if (check) {
      actionLog("PROC", "Checking register data...");
      const result = await this.authService.registerCheck({
        email,
        name,
        password,
        confirmPassword,
      });
      actionLog("INFO", "Register information is valid and correct");
      return res.status(httpStatus.CREATED).json(result);
    }
    actionLog("PROC", "Registering new user...");
    const result = await this.authService.register({
      email,
      name,
      confirmPassword,
      password,
    });
    
    actionLog("INFO", "User registered correctly");
    return res.status(httpStatus.CREATED).json(result);
  });

  login = catchAsync(async (req, res) => {
    const { provider, email, name, picture, token, password } = req.body;

    switch (provider) {
      case "credentials":
        actionLog("PROC", "Loging in with credentials...");
        const returnCredentials = await this.authService.loginCredentials({
          email,
          password,
        });
        actionLog("INFO", "Logged in with credentials successfully.");
        return res.status(httpStatus.CREATED).json(returnCredentials);

      case "google":
        actionLog("PROC", "Loging in with google...");
        const returnGoogle = await this.authService.loginGoogle({
          email,
          name,
          picture,
          token,
        });
        actionLog("INFO", "Logged in with Google successfully");
        return res.status(httpStatus.CREATED).json(returnGoogle);

      case "check":
        actionLog("PROC", "Checking login information...");
        const returnCheck = await this.authService.loginCheck({
          email,
          password,
        });
        console.log(returnCheck)
        actionLog("INFO", "Login information is valid and correct")
        return res.status(httpStatus.OK).json(returnCheck)

      default:
        throw new ApiError(httpStatus.NOT_IMPLEMENTED, "Provider not found");
    }
  });

  refresh = catchAsync(async (req, res) => {
    const { refreshToken } = req.body;
    console.log("REFRESH TOKEN", refreshToken);

    if (!refreshToken) {
      throw new ApiError(httpStatus.CONFLICT, "Refresh Token not provided");
    }

    console.log("going to service...");
    const result = await this.authService.refresh(refreshToken);
    return res.status(200).json(result);
  });

  verifyEmail = catchAsync(async (req, res) => {
    const { emailToken } = req.body;

    if (!emailToken) {
      throw new ApiError(httpStatus.CONFLICT, "Email token not provided");
    }

    const result = await this.authService.verifyEmail(emailToken);
    return res.status(200).json(result);
  });

  logout = catchAsync(async (req, res) => {});
}