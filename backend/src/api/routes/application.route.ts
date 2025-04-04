// Update your routes file
import { Router } from "express";
import Container from "typedi";
import { auth } from "../../common/middlewares/auth-handler";
import { JSON_WEB_TOKENS } from "../../common/config";
import { ApplicationController } from "../controllers/application.controller";
import { upload } from "../../common/helpers/multer.config";

const applicationRoutes = () => {
  const router = Router();
  const applicationController: ApplicationController = Container.get(ApplicationController);
  router.route("/").get(auth(JSON_WEB_TOKENS.PUBLIC_KEY), applicationController.get);

  router
    .route("/")
    .post(
      auth(JSON_WEB_TOKENS.PUBLIC_KEY), 
      upload.single('pdfFile'), // Add Multer middleware here
      applicationController.create
    );

  router
    .route("/:id")
    .put(auth(JSON_WEB_TOKENS.PUBLIC_KEY), applicationController.update);

  router
    .route("/:id")
    .delete(auth(JSON_WEB_TOKENS.PUBLIC_KEY), applicationController.delete);

  return router;
};

export default applicationRoutes;