import mongoose, { Schema } from "mongoose";

export const PinSchema = new mongoose.Schema<any>(
  {
    title: { type: String, required: true, unique: true },
    type: {
      type: Schema.Types.ObjectId,
      ref: "PinTypes",
      required: true,
      unique: false,
    },
    description: {
      type: String,
      required: true,
      unique: false,
      validate: {
        validator: function (value: string) {
          const wordCount = value.trim().split(/\s+/).length; // Count words
          return wordCount <= 75;
        },
        message: "Description cannot exceed 75 words.",
      },
    },
    additionalInfo: {
      type: String,
      required: false,
      unique: false,
      validate: {
        validator: function (value: string) {
          const wordCount = value.trim().split(/\s+/).length; // Count words
          return wordCount <= 150;
        },
        message: "Additional Information cannot exceed 150 words.",
      },
    },
    disaster: {
      type: Schema.Types.ObjectId,
      ref: "Disaster",
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    coordinates: {
      type: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      required: true,
    },
    status: { type: String, required: true },
    address: { type: String, required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false }
);
