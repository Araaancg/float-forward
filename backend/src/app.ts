/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status'
import express, { Response, Request, NextFunction } from 'express'
import { CORS_URIS, CORS_METHODS, isProd } from './common/config'
import { ApiError, rateLimiter } from './common/helpers/middlewares'
import { errorConverter, errorHandler } from './common/helpers/middlewares/error-handlers'
import { initializeDatabase } from './common/loaders/mongo.loader'
import routes from './common/routes'
//import { loadCloud } from './common/loaders/cloudinary.loader'
// import cors from 'cors'

export const init = async() => {
  const app = express()
  await initializeDatabase()
  // await loadCloud()
  // sessionLoader()

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  // app.use(
  //   cors({
  //     origin: CORS_URIS,
  //     methods: CORS_METHODS,
  //     allowedHeaders: ['Content-Type', 'Authorization']
  //   })
  // )

  if (isProd) {
    app.use('/v1', rateLimiter())
  }

  app.get('/status', async (req, res) => {
    res.status(200).send({ status: true })
  })
  
  app.use('/api/v1', routes())
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.error('REQUEST TO', req.originalUrl)
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
  })

  app.use(errorConverter())
  app.use(errorHandler(isProd))

  return app
}


