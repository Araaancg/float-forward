import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema<any>(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },
    profileImage: { type: String, required: false, default: null },
  },
  { timestamps: true, versionKey: false }
);

// UserSchema.statics.isEmailTaken = async function (email, excludeUserId) {
//   const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
//   return !!user;
// };

// UserSchema.statics.isNameTaken = async function (name, excludeUserId) {
//   if (name) {
//     const user = await this.findOne({ name, _id: { $ne: excludeUserId } });
//     return !!user;
//   } else return false;
// };
