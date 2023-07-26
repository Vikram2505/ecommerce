const mongoose = require("mongoose");
const { Schema } = mongoose;
import { Role } from "../_helpers/role";

const userSchema = new Schema({
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
  role: { type: String, required: true, default: Role.User },
  //   addresses: { type: [Schema.Types.Mixed] },
  //   orders: { type: [Schema.Types.Mixed] },
  userBlocked: {
    type: Boolean,
    default: false,
  },
});

const virtual = productSchema.virtual("id");
virtual.get(() => {
  return this._id;
});
productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (ret) => delete ret._id,
});

exports.User = mongoose.model("User", userSchema);
