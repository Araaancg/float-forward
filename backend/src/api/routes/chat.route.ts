import { Router } from "express";
import Container from "typedi";
import { auth } from "../../common/middlewares/auth-handler";
import { JSON_WEB_TOKENS } from "../../common/config";
import { ChatController } from "../controllers/chat.controller";
// import { validate } from "../../common/validations/validate";
// import { schemas } from "../../common/validations";

const chatRoutes = () => {
  const router = Router();
  const chatController: ChatController = Container.get(ChatController);
  router
    .route("/")
    .get(
      auth(JSON_WEB_TOKENS.PUBLIC_KEY),
      // validate(schemas),
      chatController.get
    );
    
  router
    .route("/")
    .post(
      auth(JSON_WEB_TOKENS.PUBLIC_KEY),
      // validate(schemas),
      chatController.create
    );

  router
    .route("/read-messages")
    .post(
      auth(JSON_WEB_TOKENS.PUBLIC_KEY),
      // validate(schemas),
      chatController.readMessages
    );

  router
    .route("/unread-messages")
    .get(
      auth(JSON_WEB_TOKENS.PUBLIC_KEY),
      // validate(schemas),
      chatController.getUnreadMessages
    );

  return router;
};

export default chatRoutes;
