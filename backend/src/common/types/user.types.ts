import { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  email: string;
  name: string;
  profilePicture?: string;
  isEmailVerified: boolean;
  password?: string;
  googleId: string,
  authProvider: "google" | "credentials"
  isVerified: boolean;
  role: "first-responder" | "regular";
}
