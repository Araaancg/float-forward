import Container, { Service } from "typedi";
import { ApiError } from "../../common/middlewares/error-handler";
import httpStatus from "http-status";
import { MessageService } from "./message.service";
import { PinService } from "./pin.service";
import {
  ChatParticipantRoles,
  ChatStatus,
  IChat,
  IChatParticipants,
  IMessage,
  MessageStatus,
} from "../../common/types/chat.type";
import { Types } from "mongoose";
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
    try {
      actionLog("PROCESS", "CHAT", `Retrieving chats from user: ${userId}`);
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
        })
        .populate({
          path: "pin",
          populate: {
            path: "type",
          },
        });
      actionLog("SUCCESS", "CHAT", `Chats retrived successfully`);
      actionLog("PROCESS", "CHAT", `Retrieving messages from chats...`);

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

      actionLog("SUCCESS", "CHAT", `Messages retrived successfully`);

      return { success: true, data: chatWithMessages };
    } catch (e) {
      actionLog(
        "ERROR",
        "CHAT",
        `Something went wrong when retriving chats: ${e}`
      );
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong when retriving chats: ${e}`
      );
    }
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
      // CASE SCENARIO 1: Chat does not exist
      if (!chatId) {
        actionLog("PROC", "CHAT", "Chat does not exist, creating chat...");
        // get pin information
        actionLog("PROC", "CHAT", "Retrieving pin information to link to chat...");
        const pin = (await this.pinService.get({ _id: pinId })).data[0];
        if (!pin) {
          actionLog("ERROR", "CHAT", "Pin provided does not exist");
          throw new ApiError(httpStatus.NOT_FOUND, "Pin not found");
        }
        actionLog("INFO", "CHAT", "Pin information retrieved succesfully");
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
        actionLog("SUCCESS", "CHAT", "Chat created succesfully");

        // create the first message in db
        actionLog("PROCESS", "CHAT", "Posting messages...");
        const messageCreated = await this.messageService.create({
          chatId: chatCreated._id,
          sender,
          content: message,
          status: MessageStatus.SENT,
        });
        actionLog("SUCCESS", "CHAT", "Message posted succesfully");

        return {
          success: true,
          data: { ...chatCreated.toObject(), messages: messageCreated },
        };
      } else {
        // CASE SCENARIO 2: chat exists
        // chat already exists so we just have to create the message
        // either way we retrieve the chat so we can return it too
        actionLog("INFO", "CHAT", "Chat already exist, retrieving chat information...");
        const confirmChat = (await this.get({ _id: chatId })).data[0];
        if (!confirmChat) {
          actionLog("ERROR", "CHAT", "Chat provided could not be found");
          throw new ApiError(httpStatus.NOT_FOUND, "Chat couldn't be found");
        }
        actionLog("SUCCESS", "CHAT", "Chat information retrieved succesfully");
        actionLog("PROCESS", "CHAT", "Posting new messages...");
        await this.messageService.create({
          chatId,
          sender,
          content: message,
          status: MessageStatus.SENT,
        });
        // reget the chat with the new message
        const chat = (await this.get({ _id: chatId })).data[0];
        actionLog("SUCCESS", "CHAT", "Messages posted succesfully");

        return {
          success: true,
          data: chat,
        };
      }
    } catch (e: any) {
      actionLog("ERROR", "CHAT", "There was an error when posting new messages");
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

  async readMessages({
    _id,
    user,
  }: {
    _id: Types.ObjectId;
    user: Types.ObjectId;
  }): Promise<unknown> {
    try {
      const chat = (await this.get({ _id })).data[0];
      if (!chat) {
        // actionLog("ERROR", "Chat provided was not found");
        throw new ApiError(httpStatus.NOT_FOUND, "Chat provided was not found");
      }

      // confirm the user is a participant of this chat
      const isParticpant =
        chat.participants.filter(
          (el: IChatParticipants) =>
            (el.user._id?.toString() as string) === user.toString()
        ).length > 0;
      if (!isParticpant) {
        // actionLog("ERROR", "User provided is not a participant of this chat");
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "User is not authorized to update this chat."
        );
      }

      // actionLog("PROC", "Retrieving all messages from chat...");
      const allMessages: IMessage[] = chat.messages;

      const unreadMessages = allMessages.filter(
        (el: IMessage) =>
          el.status === "sent" &&
          (el.sender.toString() as string) !== user.toString()
      );

      // update status of all messges to read
      if (unreadMessages.length === 0) {
        // actionLog("INFO", "No unread messages found in this chat");
        return { data: 0, success: true };
      }

      // actionLog("PROC", "Updating messages status");
      const updatePromises = unreadMessages.map(async (message) => {
        // Await the update for each message
        return await this.messageService.update(message._id, {
          status: MessageStatus.READ,
        });
      });
      const updateResults = await Promise.all(updatePromises);

      return {
        data: updateResults.length,
        success: true,
      };
    } catch (e) {
      if (e instanceof ApiError) {
        // rethrow the error if it is a custom error
        throw e;
      }
      // else make it custom
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "There was an error updating messages"
      );
    }
  }

  private countUnreadMessagesPerChat = (chats: IChat[], userId?: string) => {
    const unreadMessagesByChat: { [chatId: string]: number } = {};
    let totalUnreadCount = 0;

    chats.forEach((chat) => {
      if (chat.messages) {
        // Count unread messages (status = 'sent')
        const unreadMessages = chat.messages.filter(
          (message) =>
            message.status === "sent" &&
            (message.sender.toString() as string) !== userId
        );

        // Store count for the individual chat
        unreadMessagesByChat[chat._id] = unreadMessages.length;

        // Add to the total unread count
        totalUnreadCount += unreadMessages.length;
      }
    });

    // Return both the individual counts and the total count
    return {
      unreadMessagesByChat,
      totalUnreadCount,
    };
  };

  async getUnreadMessages({
    userId,
    chatId,
  }: {
    userId: Types.ObjectId;
    chatId?: Types.ObjectId; // chatId is optional
  }): Promise<unknown> {
    try {
      let unreadMessages;
      let allChats: IChat[];
      if (!chatId) {
        // SCENARIO 1: No chat ID was provided - getting all unread messages
        // actionLog("PROC", "Retrieving all chats from user...");
        allChats = (await this.get({}, {}, userId.toString())).data;
      } else {
        // SCENARIO 2: chat ID is provided - we just get unread messages from that chat
        allChats = (await this.get({ _id: chatId })).data;
      }

      // actionLog("PROC", "Counting all unreadMessages...");
      unreadMessages = this.countUnreadMessagesPerChat(
        allChats!,
        userId.toString()
      );
      return {
        data: unreadMessages, // number of unread messages
        success: true,
      };
    } catch (e) {
      if (e instanceof ApiError) {
        // rethrow the error if it is a custom error
        throw e;
      }
      // else make it custom
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "There was an error getting unread messages"
      );
    }
  }
}
