import { Request, Response } from "express";
import { Service } from "typedi";
import { catchAsync } from "../../common/helpers/catch-async";
import { ChatService } from "../services/chat.service";
import actionLog from "../../common/helpers/actionLog";

@Service()
export class ChatController {
  constructor(private chatService: ChatService) {}

  get = catchAsync(async (req, res) => {
    actionLog("PROC", "Retrieving chats...")
    const { limit = 10, skip = 0, ...body } = req.query;
    const token = req.token;
    const result = await this.chatService.get(body, { limit, skip }, token.sub.toString());
    actionLog("INFO", "Chats retrieved successfully")
    res.send(result);
  });

  create = catchAsync(async (req, res) => {
    const body = req.body;
    const token = req.token;
    body.sender = token.sub
    const result = await this.chatService.create(body);
    res.send(result);
  });

  // update = catchAsync(async (req: any, res: Response) => {
  //   const result = await this.chatService.update(req.token.sub, req.body);

  //   res.send({ sucess: true, user: result });
  // });

  // delete = catchAsync(async (req: any, res: Response) => {
  //   const result = await this.chatService.delete(req.token.sub);

  //   res.send(result);
  // });
}
