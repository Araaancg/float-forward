/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatus from 'http-status'
import Container, { Service } from 'typedi'
import { TokenService } from './token.service'
import mongoose, { Model } from 'mongoose'
import { NodemailerService } from '../../../common/utils/nodemailer/nodemailer.service'
import { ApiError } from '../../../common/helpers/middlewares'
import { UserService } from '../user.service'
import { MAIL } from '../../../common/config'


@Service()
export class AuthService {
  private tokenModel: Model<any, any>

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private emailService: any
  ) {
    this.tokenModel = Container.get('Token'),
    this.emailService = new NodemailerService(MAIL)
  }

  /**
   * The `loginPasswordless` function logs in a user using a passwordless authentication method by
   * finding the user based on their email, creating a new user if they don't exist, and sending a
   * two-factor authentication (2FA) code to the user.
   * @param {string} email - A string representing the email address of the user trying to log in.
   * @returns a Promise that resolves to an unknown value.
   */
  async signupPasswordless({
    email,
    name,
  }: {
    email: string
    name: string
  }): Promise<unknown> {
    const user = await this.userService.create({ email, name })
    console.log('user->', user)

    return this.send2FA(user)
  }

  /**
 * The `loginPasswordless` function logs in a user using a passwordless authentication method by
 * finding the user based on their email, creating a new user if they don't exist, and sending a
 * two-factor authentication (2FA) code to the user.
 * @param {string} email - A string representing the email address of the user trying to log in.
 * @returns a Promise that resolves to an unknown value.
 */
  async loginPasswordless(email: string): Promise<unknown> {

    const user = (await this.userService.get({ email }, null))[0]
    
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Please register user in the DB manually ahead of using it')
    }

    return this.send2FA({ email, _id: new mongoose.Types.ObjectId() })
  }

  /**
 * The function sends a verification email to a user with a generated token.
 * @param user - The `user` parameter is an object of type `UserInterfaces.IUserDocument`. It
 * represents a user document in a database and contains information about the user, such as their
 * email address.
 * @returns an object with a property "emailSent" which is a boolean value indicating whether the email
 * was successfully sent or not.
 */
  private async send2FA(user: Partial<any>): Promise<unknown> {
    const token = await this.tokenService.generateVerifyEmailToken(user)
    console.log('token->', token)
    const result = this.emailService.sendVerificationEmail(user.email, token)

    return { emailSent: !!result }
  }

  /**
   * The function `verifyEmail` verifies an access token, retrieves the corresponding user, deletes the
   * access token, and generates new authentication tokens for the user.
   * @param {string} access_token - The access_token parameter is a string that represents the token used
   * for email verification.
   * @returns the result of calling the `generateAuthTokens` method of the `tokenService` object.
   */
  async verifyEmail(access_token: string): Promise<unknown> {
    const { token } = await this.tokenService.verifyToken(
      access_token,
      'VerifyEmail'
    )

    const user = (await this.userService.get({ _id: token.user }, null))[0]

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }

    await token.deleteOne()

    return this.tokenService.generateAuthTokens(user)
  }

  /**
   * The above function logs out a user by deleting their refresh token from the database.
   * @param {string} refreshToken - The `refreshToken` parameter is a string that represents the refresh
   * token used for authentication.
   * @returns an object with the property "logout" set to true.
   */
  async logout(refreshToken: string): Promise<unknown> {
      return async () => {
        const refreshTokenDoc = await this.tokenModel.findOne({
          token: refreshToken,
          type: 'Refresh',
          blacklisted: false
        })

        if (!refreshTokenDoc) {
          throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
        }

        await refreshTokenDoc.deleteOne()
      }
  }


  /**
   * The function `refreshAuth` takes a refresh token, verifies it, deletes it, and generates new
   * authentication tokens for the user associated with the token.
   * @param  - The `refreshAuth` function takes in an object as its parameter with a property
   * `refreshToken` of type string. This `refreshToken` is used to verify the user's authentication
   * token.
   * @returns a Promise that resolves to an unknown value.
   */
  async refreshAuth({
    refreshToken
  }: {
    refreshToken: string
  }): Promise<unknown> {
    try {
      const { token } = await this.tokenService.verifyToken(
        refreshToken,
        'Refresh'
      )

      const user = (await this.userService.get({ _id: token.user }, null))[0]


      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
      }

      await token.deleteOne()

      return this.tokenService.generateAuthTokens(user)
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate')
    }
  }
}
