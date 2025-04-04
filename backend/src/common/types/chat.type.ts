import { Types } from "mongoose";
import { IPin } from "./pin.type";
import { IUser } from "./user.types";

export enum ChatParticipantRoles {
  SEEKER = "seeker",
  VOLUNTEER = "volunteer",
}

export enum ChatStatus {
  ACTIVE = "active",
  ARCHIVED = "archived",
}

export enum MessageStatus {
  SENT = "sent",
  RECEIVED = "received",
  READ = "read",
  FAILED = "failed",
}

export interface IChatParticipants {
  user: IUser,
  role: ChatParticipantRoles,
  lastRead: Date
}

export interface IChat {
  _id: string,
  pin: IPin,
  participants: IChatParticipants[],
  status: ChatStatus,
  messages: IMessage[]
}

export interface IMessage {
  _id: string,
  chatId: string,
  sender: string,
  content: string,
  status: MessageStatus
}