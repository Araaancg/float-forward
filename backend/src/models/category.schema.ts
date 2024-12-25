import mongoose from "mongoose";

export const CategorySchema = new mongoose.Schema<any>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true, versionKey: false }
);

CategorySchema.statics.isNameTaken = async function (name, excludeId) {
  const category = await this.findOne({ name, _id: { $ne: excludeId } });
  return !!category;
};
