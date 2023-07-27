import mongoose from "mongoose";
// const { Schema } = mongoose;
import { Role } from "../_helpers/role.js";

const UserChatModel = mongoose.Schema(
  {
    userId: { type: String },
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
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

// const virtual = userSchema.virtual("id");
// virtual.get(() => {
//   return this._id;
// });
// userSchema.set("toJSON", {
//   virtuals: true,
//   versionKey: false,
//   transform: (ret) => delete ret._id,
// });

export default mongoose.model("User_Messages", UserChatModel);
