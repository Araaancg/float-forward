import { Router } from 'express'
import Container from 'typedi'
import { JSON_WEB_TOKENS } from '../../common/config'
import { auth } from '../../common/middlewares/auth-handler'
import { AuthController } from '../controllers/auth.controller'

const authRoutes = () => {
  const router = Router()
  const authController: AuthController = Container.get(AuthController)
  router
    .route('/login')
    .post(
      // validate(schemas),
      // authController.login
    )
  router
    .route('/logout')
    .post(
      // validate(schemas),
      auth(JSON_WEB_TOKENS.PUBLIC_KEY!),
      // authController.logout
    )
  return router
}

export default authRoutes