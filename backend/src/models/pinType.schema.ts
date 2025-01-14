import mongoose  from "mongoose";

export const PinTypesSchema = new mongoose.Schema<any>(
  {
    title: { type: String, required: true, unique: true },
    description: {
      type: String,
      required: true,
      unique: false,
    },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false }
);
