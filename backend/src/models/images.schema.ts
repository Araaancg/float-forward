import mongoose from "mongoose";

export const ImagesSchema = new mongoose.Schema<any>(
  {
    href: { type: String, required: true, unique: false },
    alt: { type: String, required: true, unique: false },
    author: { type: String, required: false, unique: false },
    source: { type: String, required: true, default: null },
    link: { type: String, required: false, },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false }
);
