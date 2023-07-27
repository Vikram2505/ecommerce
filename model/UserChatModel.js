import mongoose from "mongoose";
// const { Schema } = mongoose;
import { Role } from "../_helpers/role.js";

const UserChatModel = mongoose.Schema(
  {
    id: { type: String },
    name: { type: String },
    role: {
      type: [String],
      enum: Object.keys(Role),
      default: Role.User,
    },
    profile: {
      type: String,
    },
    message: {
      type: [String],
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserChatModel);
