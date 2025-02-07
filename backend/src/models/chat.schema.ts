import mongoose, { Schema } from "mongoose";

export const ChatSchema = new mongoose.Schema<any>(
  {
    pin: {
      type: Schema.Types.ObjectId,
      ref: "Pin",
      required: false,
    },
    participants: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["seeker", "volunteer"],
          required: false,
        },
        lastRead: { type: Date, default: null },
      },
    ],
    status: {
      type: String,
      enum: ["active", "archived"],
    },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false }
);
