import { Router } from 'express'
import Container from 'typedi'
import { JSON_WEB_TOKENS } from '../../common/config'
import { AuthController } from '../controllers/auth.controller'
import { validate } from '../../common/validations/validate'
import { schemas } from '../../common/validations'
import { auth } from '../../common/helpers/middlewares'

const authRoutes = () => {
  const router = Router()
  const authController: AuthController = Container.get(AuthController)
  router
    .route('/login')
    .post(
      validate(schemas),
      authController.login
    )
  router
    .route('/verify-email')
    .post(validate(schemas), authController.verifyEmail)
  router
    .route('/logout')
    .post(
      validate(schemas),
      auth(JSON_WEB_TOKENS.PUBLIC_KEY),
      authController.logout
    )
  router
    .route('/refresh')
    .post(
      validate(schemas),
      auth(JSON_WEB_TOKENS.PUBLIC_KEY),
      authController.refreshTokens
  )
  return router
}

export default authRoutes



