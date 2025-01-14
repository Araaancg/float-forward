import { Router } from "express";
import Container from "typedi";
import { auth } from "../../common/middlewares/auth-handler";
import { JSON_WEB_TOKENS } from "../../common/config";
import { DisasterController } from "../controllers/disaster.controller";
// import { validate } from "../../common/validations/validate";
// import { schemas } from "../../common/validations";

const disasterRoutes = () => {
  const router = Router();
  const disasterController: DisasterController = Container.get(DisasterController);
  router
    .route("/")
    .get(
      // auth(JSON_WEB_TOKENS.PUBLIC_KEY), // user can see disasters without being authenticated
      // validate(schemas),
      disasterController.get
    );

  router
    .route("/")
    .post(
      auth(JSON_WEB_TOKENS.PUBLIC_KEY),
      // validate(schemas),
      disasterController.create
    );

  router
    .route("/:id")
    .put(
      auth(JSON_WEB_TOKENS.PUBLIC_KEY),
      // validate(schemas),
      disasterController.update
    );

  router
    .route("/:id")
    .delete(
      auth(JSON_WEB_TOKENS.PUBLIC_KEY),
      // validate(schemas),
      disasterController.delete
    );

  return router;
};

export default disasterRoutes;
