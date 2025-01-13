import {PinTypes, PriorityTypes } from "./enums";
import { ICoordinates } from "./interfaces";

export interface IUser {
  _id: string;
  name?: string | null;
  email?: string | null;
  profilePicture?: string | null;
  authProvider?: "google" | "email";
  password?: string;
  accessToken?: string;
  refreshToken?: string;
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
  location: ICoordinates
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
  latitude: number;
  longitude: number;
  address: string;
  user: IUser;
  disasterId: string;
  priority?: PriorityTypes
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
