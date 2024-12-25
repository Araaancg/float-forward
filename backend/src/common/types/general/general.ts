/* eslint-disable */

import { type Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { Schema } from 'mongoose'

namespace GeneralTypes {
  export type IToken = JwtPayload & {
    email?: string
    locale?: string
    userId?: string | Schema.Types.ObjectId
    sub?: string | Schema.Types.ObjectId
    [key: string]: any
  }

  export type IRequest = Request & {
    token: IToken
    files: any
  }

  export type ResponseError = {
    status?: number
  } & Error

  export interface IApiService {
    get: (endpoint: string, data: unknown, headers?: any) => any
    post: (endpoint: string, data: unknown, headers?: any) => any
    patch: (endpoint: string, data: unknown, headers?: any) => any
    put: (endpoint: string, data: unknown, headers?: any) => any
    delete: (endpoint: string, data: unknown, headers?: any) => any
  }
}

export default GeneralTypes
