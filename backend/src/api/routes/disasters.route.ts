import { Router } from "express";
import Container from "typedi";
import { auth } from "../../common/middlewares/auth-handler";
import { JSON_WEB_TOKENS } from "../../common/config";
import { DisasterController } from "../controllers/disaster.controller";

const disasterRoutes = () => {
  const router = Router();
  const disasterController: DisasterController =
    Container.get(DisasterController);
    
  router.route("/").get(disasterController.get);

  router
    .route("/")
    .post(auth(JSON_WEB_TOKENS.PUBLIC_KEY), disasterController.create);

  router
    .route("/:id")
    .put(auth(JSON_WEB_TOKENS.PUBLIC_KEY), disasterController.update);

  router
    .route("/:id")
    .delete(auth(JSON_WEB_TOKENS.PUBLIC_KEY), disasterController.delete);

  return router;
};

export default disasterRoutes;
