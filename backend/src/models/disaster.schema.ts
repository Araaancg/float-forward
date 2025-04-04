import mongoose, { Schema } from "mongoose";

export const DisasterSchema = new mongoose.Schema<any>(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: false },
    country: { type: String, required: true, unique: false },
    city: { type: String, required: true, default: null },
    coordinates: {
      type: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      required: true,
    },
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: "Images",
        required: false,
      },
    ],
    slug: { type: String, required: true, default: null },
    date: { type: Date, required: true, default: new Date() },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false }
);
