import Container, { Service } from "typedi";
import { ApiError } from "../../common/middlewares/error-handler";
import httpStatus from "http-status";
import { MessageService } from "./message.service";
import { PinService } from "./pin.service";
import {
  ChatParticipantRoles,
  ChatStatus,
  MessageStatus,
} from "../../common/types/chat.type";

@Service()
export class ChatService {
  private chatModel: any;

  constructor(
    private messageService: MessageService,
    private pinService: PinService
  ) {
    this.chatModel = Container.get("Chat");
  }

  async get(
    filter?: { [key: string]: any },
    options?: { [key: string]: any },
    userId?: string
  ): Promise<any> {
    const query = { ...filter, deletedAt: null } as any;
    if (userId) {
      query["participants"] = {
        $elemMatch: {
          user: userId,
        },
      };
    }
    let chats = await this.chatModel
      .find(query, {}, options)
      .populate("participants.user")
      .populate("pin")
      .populate({
        path: "pin",
        populate: {
          path: "disaster",
        },
      });

    const chatWithMessages = await Promise.all(
      chats.map(async (chat: any) => {
        const messages = await this.messageService.get({ chatId: chat._id });

        const chatObj = chat.toObject();
        return {
          ...chatObj,
          messages,
        };
      })
    );
    console.log("CHAT GOTTEN", chatWithMessages);

    return { success: true, data: chatWithMessages };
  }

  async create({
    chatId,
    pinId,
    sender,
    receiver,
    message,
  }: {
    chatId?: string;
    pinId: string;
    sender: string;
    receiver: string;
    message: string;
  }): Promise<any> {
    try {
      console.log({ chatId, pinId, sender, receiver, message });
      // CASE SCENARIO 1: Chat does not exist
      if (!chatId) {
        console.log("Chat doesn't exist");
        console.log({ chatId, pinId, sender, receiver, message });
        // get pin information
        const pin = (await this.pinService.get({ _id: pinId }))[0];
        console.log("OBTAINED PIN", pin);
        if (!pin) {
          throw new ApiError(httpStatus.NOT_FOUND, "Pin not found");
        }
        console.log("it passed");
        // Create object of participants
        const participants = [
          {
            user: pin.user._id === sender ? sender : receiver,
            role: ChatParticipantRoles.SEEKER,
            lastRead: new Date(),
          },
          {
            user: pin.user._id !== sender ? sender : receiver,
            role: ChatParticipantRoles.VOLUNTEER,
            lastRead: new Date(),
          },
        ];

        // create chat object in the db
        const chatCreated = (
          await this.chatModel.create([
            {
              pin: pinId,
              participants,
              status: ChatStatus.ACTIVE,
            },
          ])
        )[0];
        console.log("CREATED CHAT", chatCreated);

        // create the first message in db
        const messageCreated = await this.messageService.create({
          chatId: chatCreated._id,
          sender,
          content: message,
          status: MessageStatus.SENT,
        });
        console.log("CREATED MESSAGE", messageCreated);

        return {
          success: true,
          data: { ...chatCreated.toObject(), messages: messageCreated },
        };
      } else {
        // chat already exists so we just have to create the message
        // either way we retrieve the chat so we can return it too
        console.log(chatId);
        const confirmChat = (await this.get({ _id: chatId })).data[0];
        console.log("chat", confirmChat);
        if (!confirmChat) {
          throw new ApiError(httpStatus.NOT_FOUND, "Chat couldn't be found");
        }

        await this.messageService.create({
          chatId,
          sender,
          content: message,
          status: MessageStatus.SENT,
        });
        // reget the chat with the new message
        const chat = (await this.get({ _id: chatId })).data[0];

        return {
          success: true,
          data: chat,
        };
      }

      return { sucess: true };
    } catch (e: any) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "There was an error creating the message"
      );
    }
  }
}
