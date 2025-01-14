import { Schema } from "mongoose";

export interface IImages {
  _id: string | Schema.Types.ObjectId;
  href: string;
  alt: string;
  author?: string;
  source?: string;
  link?: string;
}
