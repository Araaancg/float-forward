import { Router } from "express";
import Container from "typedi";
import { auth } from "../../common/middlewares/auth-handler";
import { JSON_WEB_TOKENS } from "../../common/config";
import { PinController } from "../controllers/pin.controller";

const pinRoutes = () => {
  const router = Router();
  const pinController: PinController = Container.get(PinController);
  router
    .route("/")
    .get(
      auth(JSON_WEB_TOKENS.PUBLIC_KEY),
      pinController.get
    );
    
  router
    .route("/")
    .post(
      auth(JSON_WEB_TOKENS.PUBLIC_KEY),
      pinController.create
    );

  router
    .route("/:id")
    .put(
      auth(JSON_WEB_TOKENS.PUBLIC_KEY),
      pinController.update
    );

  router
    .route("/:id")
    .delete(
      auth(JSON_WEB_TOKENS.PUBLIC_KEY),
      pinController.delete
    );

  return router;
};

export default pinRoutes;
