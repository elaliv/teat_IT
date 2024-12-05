import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  collegeGroup: string;
}

const UserSchema = new Schema({
  fullName: { type: String, required: true},
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  collegeGroup: { type: String, required: true },
});

const User = models.User || model("User", UserSchema);

export default User;
