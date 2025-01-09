import { Schema } from "mongoose";

export interface IUser {
  _id?: string | Schema.Types.ObjectId;
  email: string;
  fullName: string;
  // lastName: string;
  profileImage?: string;
  isEmailVerified: boolean;
  password?: string;
  googleId: string,
  authProvider: "google" | "credentials"
}
