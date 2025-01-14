import { Schema } from "mongoose";

export interface IUser {
  _id?: string | Schema.Types.ObjectId;
  email: string;
  name: string;
  // lastName: string;
  profilePicture?: string;
  isEmailVerified: boolean;
  password?: string;
  googleId: string,
  authProvider: "google" | "credentials"
}
