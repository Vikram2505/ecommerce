import mongoose from "mongoose";
// const { Schema } = mongoose;
import { Role } from "../_helpers/role.js";

const userSchema = mongoose.Schema(
  {
    id: { type: String },
    name: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/,
    },
    password: { type: String, required: true },
    role: {
      type: [String],
      enum: Object.keys(Role),
      default: Role.User,
    },
    //   addresses: { type: [Schema.Types.Mixed] },
    //   orders: { type: [Schema.Types.Mixed] },
    userBlocked: {
      type: Boolean,
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

export default mongoose.model("User", userSchema);
