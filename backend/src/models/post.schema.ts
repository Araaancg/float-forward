import mongoose, { Schema } from "mongoose";

export const PostSchema = new mongoose.Schema<any>(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    public: { type: Boolean, default: true },
    meta_title: { type: String, default: "" },
    meta_image: { type: String, default: "" },
    meta_description: { type: String, default: "" },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

PostSchema.statics.isTitleTaken = async function (title, excludeId) {
  const post = await this.findOne({ title, _id: { $ne: excludeId } });
  return !!post;
};
