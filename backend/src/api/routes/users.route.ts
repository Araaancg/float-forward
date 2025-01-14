import { Router } from "express";
import Container from "typedi";
import { UserController } from "../controllers/user.controller";
import { auth } from "../../common/middlewares/auth-handler";
import { JSON_WEB_TOKENS } from "../../common/config";
// import { validate } from "../../common/validations/validate";
// import { schemas } from "../../common/validations";

const userRoutes = () => {
  const router = Router();
  const userController: UserController = Container.get(UserController);
  router
    .route("/")
    .get(
      auth(JSON_WEB_TOKENS.PUBLIC_KEY),
      // validate(schemas),
      userController.get
    );

  router
    .route("/")
    .post(
      auth(JSON_WEB_TOKENS.PUBLIC_KEY),
      // validate(schemas),
      userController.create
    );

  router
    .route("/")
    .put(
      auth(JSON_WEB_TOKENS.PUBLIC_KEY),
      // validate(schemas),
      userController.update
    );

  router
    .route("/")
    .delete(
      auth(JSON_WEB_TOKENS.PUBLIC_KEY),
      // validate(schemas),
      userController.delete
    );

  return router;
};

export default userRoutes;
