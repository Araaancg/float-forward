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

  // router
  //   .route("/:id")
  //   .put(
  //     auth(JSON_WEB_TOKENS.PUBLIC_KEY),
  //     // validate(schemas),
  //     chatController.update
  //   );

  // router
  //   .route("/:id")
  //   .delete(
  //     auth(JSON_WEB_TOKENS.PUBLIC_KEY),
  //     // validate(schemas),
  //     chatController.delete
  //   );

  return router;
};

export default chatRoutes;
