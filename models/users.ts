import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "وارد کردن نام الزامی است"],
  },
  email: {
    type: String,
    required: [true, "وارد کردن ایمیل الزامی است"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "وارد کردن رمز عبور الزامی است"],
  },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
