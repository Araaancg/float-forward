import { Schema } from "mongoose";

export interface IPin {
  _id: string | Schema.Types.ObjectId;
  type: string | Schema.Types.ObjectId;
  title: string;
  description: string;
  additionalInfo?: string;
  latitude: number;
  longitude: number;
  address: string;
  user: string | Schema.Types.ObjectId;
  disaster: string;
  status: PinStatus,
  priority?: string;
}

export interface IPinType {
  _id: string | Schema.Types.ObjectId;
  title: PinTypes;
  description: string;
}

export enum PinStatus {
  ACTIVE = "active",
  CLOSED = "closed",
  DELETED = "deleted",
}

export enum PinTypes {
  HELP_REQUEST = "Help Request",
  COLLECTION_POINT = "Collection Point",
  MEDICAL_POINT = "Medical Request",
  MISSINGS = "Missings",
  HELP_OFFER = "Help Offer",
  INFORMATION_POINT = "Information Point",
}
