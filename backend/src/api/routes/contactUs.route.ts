import { Router } from "express";
import Container from "typedi";
import { ContactUsController } from "../controllers/contactUs.controller";

const contactUsRoutes = () => {
  const router = Router();
  const contactUsController: ContactUsController =
    Container.get(ContactUsController);
    
  router
    .route("/")
    .post(contactUsController.sendMessage);

  return router;
};

export default contactUsRoutes;
