/* eslint-disable @typescript-eslint/no-unused-vars */
import { Service } from 'typedi'
import httpStatus from 'http-status'
import { AuthService } from '../services/auth/auth.service'
import { catchAsync } from '../../common/helpers/utils/catchasync'
import { ApiError } from '../../common/helpers/middlewares'

@Service()
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  login = catchAsync(async (req, res) => {
    const { email, provider, access_token } = req.body

    switch (provider) {
      case 'passwordless':
        const result = await this.authService.loginPasswordless(email)
        return res.status(200).send(result)
      case 'other':
        throw new ApiError(httpStatus.NOT_IMPLEMENTED, 'Provider not found')
    }
  })

  signup = catchAsync(async (req, res) => {
    const { email, name } = req.body

      
        const result = await this.authService.signupPasswordless({
          email,
          name
        })
        return res.status(200).send(result)
    
  })

  verifyEmail = catchAsync(async (req, res) => {
    const { access_token } = req.body
    const tokens = await this.authService.verifyEmail(access_token)

    return res.status(200).send(tokens)
  })

  logout = catchAsync(async (req, res) => {
    const { refreshToken } = req.body

    await this.authService.logout(refreshToken)

    return res.status(httpStatus.NO_CONTENT).send()
  })

  refreshTokens = catchAsync(async (req, res) => {
    const { refreshToken } = req.body
    const tokens = <
      {
        access: {
          token: string
          expires: string
        }
        refresh: {
          token: string
          expires: string
        }
      }
      >await this.authService.refreshAuth({ refreshToken })

    return res.send({ ...tokens })
  })
}
