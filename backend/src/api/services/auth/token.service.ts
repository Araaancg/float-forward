import jwt from 'jsonwebtoken'
import moment from 'moment'
import mongoose, { AnyObject, Model, ObjectId } from 'mongoose'
import Container, { Service } from 'typedi'
import httpStatus from 'http-status'
import { JSON_WEB_TOKENS } from '../../../common/config'
import { ApiError } from '../../../common/middlewares/error-handler'

@Service()
export class TokenService {
  private tokenModel: Model<any, any>
  
  constructor() {
    this.tokenModel = Container.get('Token')
  }
  
  generateToken(
    data: {
      user: ObjectId
    },
    expires = moment().add(10, 'm'),
    type: any
  ): string {
    console.info('generate tokens -->', JSON_WEB_TOKENS.PRIVATE_KEY)

    const payload = {
      sub: data.user,
      aud: [
        'https://localhost:8080'
      ],
      iss: 'https://localhost:8080',
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    }

    return jwt.sign(payload, JSON_WEB_TOKENS.PRIVATE_KEY!, {
      algorithm: 'ES256',
      keyid: '4a9c726f4db1238e97fb605af'
    })
  }

  async saveToken(
    token: string,
    user: mongoose.ObjectId,
    expires: moment.Moment,
    type: any,
    blacklisted = false
  ) {
      return async (session: mongoose.ClientSession) => {
        return await this.tokenModel.create(
          [
            {
              token,
              user: user,
              expires: expires.toDate(),
              type,
              blacklisted
            }
          ],
          { session }
        )
      }
  }

  async verifyToken(
    token: string,
    type: any
  ): Promise<{
    token: AnyObject
  }> {
    let payload

    try {
      payload = jwt.verify(token, JSON_WEB_TOKENS.PRIVATE_KEY!)
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token')
    }

    let tokenDoc = null

    if (type === 'Refresh') {
      tokenDoc = await this.tokenModel.findOne({
        token,
        type,
        blacklisted: false
      })
      
    } else {
      tokenDoc = await this.tokenModel.findOne({
        token,
        type,
        user: payload.sub,
        blacklisted: false
      })
    }

    if (!tokenDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Token not found')
    }

    return { token: tokenDoc }
  }

  async generateAuthTokens(
    user: any,
  ): Promise<any> {
    const accessTokenExpires = moment().add(
      JSON_WEB_TOKENS.accessExpirationMinutes,
      'minutes'
    )

    const accessToken = this.generateToken(
      {
        user: user._id,
      },
      accessTokenExpires,
      'Access'
    )

    const refreshTokenExpires = moment().add(
      JSON_WEB_TOKENS.refreshExpirationDays,
      'days'
    )

    const refreshToken = this.generateToken(
      user._id,
      refreshTokenExpires,
      'Refresh'
    )

    await this.saveToken(
      refreshToken,
      user._id,
      refreshTokenExpires,
      'Refresh'
    )

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate()
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate()
      }
    }
  }

  async generateVerifyEmailToken(
    user: Partial<any>
    // session: mongoose.ClientSession
  ): Promise<string> {
    const expires = moment().add(
      JSON_WEB_TOKENS.verifyEmailExpirationMinutes,
      'minutes'
    )

    const verifyEmailToken = this.generateToken(
      { user: user._id },
      expires,
      'VerifyEmail'
    )

    await this.saveToken(
      verifyEmailToken,
      user._id,
      expires,
      'VerifyEmail'
    )

    return verifyEmailToken
  }
}