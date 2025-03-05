import { IPin } from "./pin.type";

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

interface IChatParticipants {
  user: string,
  role: ChatParticipantRoles,
  lastRead: Date
}

export interface IChat {
  pin: IPin,
  participants: IChatParticipants[],
  status: ChatStatus,
}

export interface IMessage {
  chatId: string,
  sender: string,
  content: string,
  status: MessageStatus
}