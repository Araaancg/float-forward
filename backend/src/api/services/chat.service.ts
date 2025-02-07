import Container, { Service } from "typedi";
import { ApiError } from "../../common/middlewares/error-handler";
import httpStatus from "http-status";
import { IDisaster } from "../../common/types/disaster.type";
import { MessageService } from "./message.service";

@Service()
export class ChatService {
  private chatModel: any;

  constructor(private messageService: MessageService) {
    this.chatModel = Container.get("Chat");
  }

  async get(
    filter?: { [key: string]: any },
    options?: { [key: string]: any }
  ): Promise<any> {
    const query = { ...filter, deletedAt: null };
    let chats = await this.chatModel
      .find(query, {}, options)
      .populate("participants.user")
      .populate("pin");

    const chatWithMessages = await Promise.all(
      chats.map(async (chat: any) => {
        const messages = await this.messageService.get({ chatId: chat._id });

        // Convert Mongoose document to plain object to avoid modification issues
        const chatObj = chat.toObject();
        return {
          ...chatObj,
          messages,
        };
      })
    );

    return { success: true, chats: chatWithMessages };
  }

  async create(disaster: Partial<IDisaster>): Promise<any> {
    //   try {
    //     // const disasterCreated = await this.disasterModel.create(disaster);
    return {};
    //   } catch (e: any) {
    //     throw new ApiError(
    //       httpStatus.INTERNAL_SERVER_ERROR,
    //       "There was an error creating the message"
    //     );
    //   }
  }
}
