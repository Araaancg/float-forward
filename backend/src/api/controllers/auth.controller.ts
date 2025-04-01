import { Service } from "typedi";
import httpStatus from "http-status";
import { catchAsync } from "../../common/helpers/catch-async";
import { ApiError } from "../../common/middlewares/error-handler";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import actionLog from "../../common/helpers/actionLog";

@Service()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  register = catchAsync(async (req, res) => {
    const { email, name, password, confirmPassword, check } = req.body;

    if (check) {
      const result = await this.authService.registerCheck({
        email,
        name,
        password,
        confirmPassword,
      });
      return res.status(200).json(result);
    }
   
    const result = await this.authService.register({
      email,
      name,
      confirmPassword,
      password,
    });
    return res.status(200).json(result);
  });

  login = catchAsync(async (req, res) => {
    const { provider, email, name, picture, token, password } = req.body;

    switch (provider) {
      case "credentials":
        actionLog("INFO", "AUTH", "Login provider: credentials")
        const returnCredentials = await this.authService.loginCredentials({
          email,
          password,
        });
        return res.status(200).json(returnCredentials);
        
        case "google":
        actionLog("INFO", "AUTH", "Login provider: google")
        const returnGoogle = await this.authService.loginGoogle({
          email,
          name,
          picture,
          token,
        });
        return res.status(200).json(returnGoogle);
        
        case "check":
        actionLog("INFO", "AUTH", "Login provider: check")
        const returnCheck = await this.authService.loginCheck({
          email,
          password,
        });
        return res.status(httpStatus.OK).json(returnCheck);

      default:
        throw new ApiError(httpStatus.NOT_IMPLEMENTED, "Provider not found");
    }
  });

  refresh = catchAsync(async (req, res) => {
    const { refreshToken } = req.body;
    const result = await this.authService.refresh(refreshToken);
    return res.status(200).json(result);
  });

  verifyEmail = catchAsync(async (req, res) => {
    const { verifyEmailToken, email } = req.body;
    const result = await this.authService.verifyEmail(verifyEmailToken, email);
    return res.status(200).json(result);
  });

  checkIsVerified = catchAsync(async (req, res) => {
    actionLog("PROCESS", "AUTH", "Checking if user is verified...")
    const token = req.token;
    const result = await this.userService.get({ _id: token.sub });
    actionLog("SUCCESS", "AUTH", `Check finished: User is${result.data[0].isVerified ? " not": ""} verified`)
    return res
      .status(200)
      .json({ success: true, data: result.data[0].isVerified });
  });

  resendVerifyEmail = catchAsync(async (req, res) => {
    const token = req.token;
    const result = await this.authService.resendVerifyEmail(token.sub);
    return res.status(200).json(result);
  });

  forgotPassword = catchAsync(async (req, res) => {
    const { email } = req.body;
    const result = await this.authService.forgotPassword(email);
    return res.status(200).json(result);
  });

  resetPassword = catchAsync(async (req, res) => {
    const { password, confirmPassword, resetPasswordToken, email } = req.body;
    const result = await this.authService.resetPassword(
      resetPasswordToken,
      email,
      password,
      confirmPassword
    );
    return res.status(200).json(result);
  });

  logout = catchAsync(async (req, res) => {});
}
