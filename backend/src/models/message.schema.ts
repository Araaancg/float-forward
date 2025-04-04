import mongoose, { Schema } from "mongoose";

export const MessageSchema = new mongoose.Schema<any>(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
        type: String,
        enum: ['sent', 'received', 'read', 'failed'],
        default: 'sent'

    },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false }
);
