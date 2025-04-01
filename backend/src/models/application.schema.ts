import mongoose, { Schema } from "mongoose";
import { ApplicationStatus } from "../common/types/application.types";

export const ApplicationSchema = new mongoose.Schema<any>(
  {
    file: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: false,
      default: ApplicationStatus.SUBMITTED,
    },
    organization: {
      type: String,
      required: true,
      default: false,
      unique: false,
    },
    role: {
      type: String,
      required: true,
      default: false,
      unique: false,
    },
    reference: { type: String, default: false, unique: true, required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false }
);
