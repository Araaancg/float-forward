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
import actionLog from "../../common/helpers/actionLog";

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

    actionLog("PROC", "Getting messages from chats...");

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

    actionLog("INFO", "Messages retrieved successfully");

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
        actionLog("PROC", "Chat does not exist, creating chat...");
        // get pin information
        actionLog("PROC", "Retrieving pin information to link to chat...");
        const pin = (await this.pinService.get({ _id: pinId }))[0];
        if (!pin) {
          actionLog("ERROR", "Pin provided does not exist");
          throw new ApiError(httpStatus.NOT_FOUND, "Pin not found");
        }
        actionLog("INFO", "Pin information retrieved succesfully");
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
        actionLog("INFO", "Chat created succesfully");

        // create the first message in db
        actionLog("PROC", "Posting messages...");
        const messageCreated = await this.messageService.create({
          chatId: chatCreated._id,
          sender,
          content: message,
          status: MessageStatus.SENT,
        });
        actionLog("INFO", "Message posted succesfully");

        return {
          success: true,
          data: { ...chatCreated.toObject(), messages: messageCreated },
        };
      } else {
        // CASE SCENARIO 2: chat exists
        // chat already exists so we just have to create the message
        // either way we retrieve the chat so we can return it too
        actionLog("INFO", "Chat already exist, retrieving chat information...");
        const confirmChat = (await this.get({ _id: chatId })).data[0];
        if (!confirmChat) {
          actionLog("ERROR", "Chat provided could not be found");
          throw new ApiError(httpStatus.NOT_FOUND, "Chat couldn't be found");
        }
        actionLog("INFO", "Chat information retrieved succesfully");
        actionLog("PROC", "Posting new messages");
        await this.messageService.create({
          chatId,
          sender,
          content: message,
          status: MessageStatus.SENT,
        });
        // reget the chat with the new message
        const chat = (await this.get({ _id: chatId })).data[0];
        actionLog("INFO", "Messages posted succesfully");

        return {
          success: true,
          data: chat,
        };
      }
    } catch (e: any) {
      actionLog("ERROR", "There was an error when posting new messages");
      if (e instanceof ApiError) {
        // rethrow the error if it is a custom error
        throw e;
      }
      // else make it custom
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "There was an error when posting new messages"
      );
    }
  }
}
