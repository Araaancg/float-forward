import httpStatus from "http-status";
import { Service } from "typedi";
import { catchAsync } from "../../common/helpers/catch-async";
import { ChatService } from "../services/chat.service";
import { ApiError } from "../../common/middlewares/error-handler";

@Service()
export class ChatController {
  constructor(private chatService: ChatService) {}

  get = catchAsync(async (req, res) => {
    // actionLog("PROC", "Retrieving chats...");
    const { limit = 10, skip = 0, ...body } = req.query;
    const token = req.token;
    const result = await this.chatService.get(
      body,
      { limit, skip },
      token.sub.toString()
    );
    // actionLog("INFO", "Chats retrieved successfully");
    res.send(result);
  });

  create = catchAsync(async (req, res) => {
    const body = req.body;
    const token = req.token;
    body.sender = token.sub;
    const result = await this.chatService.create(body);
    res.send(result);
  });

  readMessages = catchAsync(async (req, res) => {
    const { chatId } = req.body;
    const token = req.token;
    console.log("chatId", chatId)
    // actionLog("PROC", `Reading messages from chat ${chatId}`);
    const result = await this.chatService.readMessages({
      _id: chatId,
      user: token.sub,
    });
    // actionLog("SUCCESS", "Messages read succesfully");
    res.send(result);
  });

  getUnreadMessages = catchAsync(async (req, res) => {
    const { chatId } = req.query;
    const userId = req.token.sub.toString();
    // actionLog("PROC", `Getting unread messages from chat ${chatId}`);
    const result = await this.chatService.getUnreadMessages({
      userId,
      chatId,
    });
    // actionLog("SUCCESS", "Unread messages successfully reatrieved");
    res.status(200).send(result);
  });
}
