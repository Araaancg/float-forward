import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema<any>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: false },
    profilePicture: { type: String, required: false, default: null },
    password: { type: String, required: false, default: null },
    authProvider: { type: String, required: true },
    googleId: { type: String, required: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};
