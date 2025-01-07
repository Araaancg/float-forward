import { Service } from "typedi";
import httpStatus from "http-status";
import { catchAsync } from "../../common/helpers/catch-async";
import { ApiError } from "../../common/middlewares/error-handler";
import { AuthService } from "../services/auth.service";

@Service()
export class AuthController {
  constructor(private authService: AuthService) {}

  register = catchAsync(async (req, res) => {
    const { email, name, password, confirmPassword } = req.body;

    const result = await this.authService.register({
      email,
      name,
      confirmPassword,
      password,
    });

    return res.status(httpStatus.CREATED).json(result);
  });

  login = catchAsync(async (req, res) => {
    const { provider, email, name, picture, token, password } = req.body;

    console.log("provider", provider);

    switch (provider) {
      case "credentials":
        const returnCredentials = await this.authService.loginCredentials({
          email,
          password,
        });
        return res.status(httpStatus.CREATED).json(returnCredentials);

      case "google":
        const returnGoogle = await this.authService.loginGoogle({
          email,
          name,
          picture,
          token,
        });
        return res.status(httpStatus.CREATED).json(returnGoogle);

      default:
        throw new ApiError(httpStatus.NOT_IMPLEMENTED, "Provider not found");
    }
  });

  refresh = catchAsync(async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new ApiError(httpStatus.CONFLICT, "Refresh Token not provided");
    }

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
