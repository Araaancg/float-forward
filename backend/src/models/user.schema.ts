import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema<any>(
  {
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true, unique: false },
    // lastName: { type: String, required: true, unique: false },
    profileImage: { type: String, required: false, default: null },
    password: { type: String, required: false, default: null },
    authProvider: { type: String, required: true },
    googleId: { type: String, required: false }
  },
  { timestamps: true, versionKey: false }
);

UserSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};
