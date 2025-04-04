import httpStatus from "http-status";
import { Service } from "typedi";
import { catchAsync } from "../../common/helpers/catch-async";
import { ChatService } from "../services/chat.service";
import { ApiError } from "../../common/middlewares/error-handler";

@Service()
export class ChatController {
  constructor(private chatService: ChatService) {}

  get = catchAsync(async (req, res) => {
    const { limit, skip, ...body } = req.query;
    const token = req.token;
    const result = await this.chatService.get(
      body,
      { limit, skip },
      token.sub.toString()
    );
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
    const result = await this.chatService.readMessages({
      _id: chatId,
      user: token.sub,
    });
    res.send(result);
  });

  getUnreadMessages = catchAsync(async (req, res) => {
    const { chatId } = req.query;
    const userId = req.token.sub.toString();
    const result = await this.chatService.getUnreadMessages({
      userId,
      chatId,
    });
    res.status(200).send(result);
  });
}
