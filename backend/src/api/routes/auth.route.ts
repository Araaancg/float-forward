import { Router } from "express";
import Container from "typedi";
import { JSON_WEB_TOKENS } from "../../common/config";
import { auth } from "../../common/middlewares/auth-handler";
import { AuthController } from "../controllers/auth.controller";

const authRoutes = () => {
  const router = Router();
  const authController: AuthController = Container.get(AuthController);

  router.post("/login", authController.login);
  router.post("/register", authController.register);

  router.post("/refresh", authController.refresh);

  router
    .route("/logout")
    .post(auth(JSON_WEB_TOKENS.PUBLIC_KEY!), authController.logout);

  router.route("/forgot-password").post(authController.forgotPassword);
  router.route("/reset-password").post(authController.resetPassword);

  router.route("/verify-email").post(authController.verifyEmail);
  router
    .route("/resend-verify-email")
    .get(auth(JSON_WEB_TOKENS.PUBLIC_KEY!), authController.resendVerifyEmail);
  router
    .route("/is-verified")
    .get(auth(JSON_WEB_TOKENS.PUBLIC_KEY!), authController.checkIsVerified);
  return router;
};

export default authRoutes;
