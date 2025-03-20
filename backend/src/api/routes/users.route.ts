import { Router } from "express";
import Container from "typedi";
import { UserController } from "../controllers/user.controller";
import { auth } from "../../common/middlewares/auth-handler";
import { JSON_WEB_TOKENS } from "../../common/config";

const userRoutes = () => {
  const router = Router();
  const userController: UserController = Container.get(UserController);
  
  router.route("/").get(auth(JSON_WEB_TOKENS.PUBLIC_KEY), userController.get);

  router
    .route("/")
    .put(auth(JSON_WEB_TOKENS.PUBLIC_KEY), userController.update);

  return router;
};

export default userRoutes;
