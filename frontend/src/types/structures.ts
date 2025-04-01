import { ChatStatus, MessageStatus, PinStatus, PinTypes, PriorityTypes, UserRoles } from "./enums";
import { ICoordinates } from "./interfaces";

export interface IUser {
  _id: string;
  name?: string | null;
  email?: string | null;
  profilePicture?: string | null;
  authProvider?: "google" | "email";
  isVerified?: boolean;
  role: UserRoles
  // accessToken?: string;
  // refreshToken?: string;
}

export interface IDisasters {
  _id: string;
  title: string;
  description: string;
  country: string;
  city: string;
  slug: string;
  date?: string;
  images: IImages[];
  additionalInformation: IAddiontionalInformation[];
  pins: IPin[];
  coordinates: ICoordinates;
  statistics: {
    pinsRegistered: number,
    peopleHelped: number,
    helpOffers: number
  }
}

export interface IAddiontionalInformation {
  _id: string;
  images?: IImages[];
  link: string;
  title: string;
  description: string;
  type: ITypeInformation;
  disasterId: string;
}

export interface IPin {
  _id: string;
  type: ITypeInformation;
  title: string;
  description: string;
  additionalInfo?: string;
  coordinates: ICoordinates;
  address: string;
  user: IUser;
  disaster: IDisasters;
  priority?: PriorityTypes;
  contacts?: IUser[]
  status: PinStatus
}

export interface ITypeInformation {
  _id: string;
  title: string;
  description: string;
}

export interface IPinType {
  _id: string;
  title: PinTypes;
  description?: string;
}

export interface IImages {
  _id: string;
  href: string;
  alt: string;
  author?: string;
  sources?: string;
  link?: string;
}

export interface IChat {
  _id: string;
  participants: {
    user: IUser;
    role: "seeker" | "volunteer";
    lastRead: string;
  }[];
  createdAt: string;
  updatedAt: string;
  pin: IPin;
  messages?: IMessage[]
  status: ChatStatus
}

export interface IMessage {
  _id: string,
  chatId: string,
  sender: string, // maybe only the id? we have the user object in the participants key in the chat
  content: string,
  status: MessageStatus
  createdAt: string,
}