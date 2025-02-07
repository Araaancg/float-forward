import { Request, Response } from "express";
import { Service } from "typedi";
import { catchAsync } from "../../common/helpers/catch-async";
import { ChatService } from "../services/chat.service";

@Service()
export class ChatController {
  constructor(private chatService: ChatService) {}

  get = catchAsync(async (req: Request, res: Response) => {
    const { limit = 10, skip = 0, ...body } = req.query;
    const result = await this.chatService.get(body, { limit, skip });
    console.log("GET CHATS", result)
    res.send(result);
  });

  create = catchAsync(async (req: any, res: Response) => {
    const result = await this.chatService.create(req.body);
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
