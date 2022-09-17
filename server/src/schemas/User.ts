import mongoose from "mongoose";

interface UserTypes {
  email: string;
  fullName: string;
  password: string;
  confirmed: boolean;
  confirmHash: string;
  lastSeen: string;
  avatar?: string;
}

const User = new mongoose.Schema<UserTypes>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: String,
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    confirmHash: String,
    lastSeen: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", User);
