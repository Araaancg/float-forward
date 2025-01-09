import dotenv from 'dotenv'
dotenv.config()

// GENERAL SETTINGS 
export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV === 'production'

export const PORT = 8000
export const HOST = process.env.HOST
export const ENV = process.env.NODE_ENV

// export const CORS_URIS = isDev ? '*' : process.env.FRONT_URL_PROD
// export const CORS_METHODS = isDev
//   ? ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS']
//   : ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']

// JWT
export const JSON_WEB_TOKENS = {
  PUBLIC_KEY: process.env.JWT_PUBLIC_KEY?.replace(/\\n/g, '\n'),
  PRIVATE_KEY: process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
  refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
  resetPasswordExpirationMinutes: process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
  verifyEmailExpirationMinutes: process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
}

// in Bash
// openssl genrsa -out private.pem 2048 
// openssl rsa -in private.pem -pubout -out public.pem

// MONGO DB (TODO)
export const MONGODB_URI = process.env.MONGODB_URI

// export const MAIL = {
//   smtp: {
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     service: process.env.EMAIL_SERVICE,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   },
//   from: process.env.EMAIL_FROM,
//   urls: {
//     emailVerify: isDev
//       ? `${process.env.FRONT_URL_DEV}/authentication/verify-email`
//       : `${process.env.FRONT_URL_PROD}/authentication/verify-email`,
//     passwordReset: isDev
//       ? `${process.env.FRONT_URL_DEV}/reset-password`
//       : `${process.env.FRONT_URL_PROD}/reset-password`
//   }
// }