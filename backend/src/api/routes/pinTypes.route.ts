import { Router } from "express";
import Container from "typedi";
import { auth } from "../../common/middlewares/auth-handler";
import { JSON_WEB_TOKENS } from "../../common/config";
import { PinTypesController } from "../controllers/pinTypes.controller";
// import { validate } from "../../common/validations/validate";
// import { schemas } from "../../common/validations";

const pinTypesRoutes = () => {
  const router = Router();
  const pinTypesController: PinTypesController = Container.get(PinTypesController);
  router
    .route("/")
    .get(
      auth(JSON_WEB_TOKENS.PUBLIC_KEY),
      // validate(schemas),
      pinTypesController.get
    );

  router
    .route("/")
    .post(
      auth(JSON_WEB_TOKENS.PUBLIC_KEY),
      // validate(schemas),
      pinTypesController.create
    );

  router
    .route("/:id")
    .put(
      auth(JSON_WEB_TOKENS.PUBLIC_KEY),
      // validate(schemas),
      pinTypesController.update
    );

  router
    .route("/:id")
    .delete(
      auth(JSON_WEB_TOKENS.PUBLIC_KEY),
      // validate(schemas),
      pinTypesController.delete
    );

  return router;
};

export default pinTypesRoutes;
