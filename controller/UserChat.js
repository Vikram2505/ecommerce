import mongoose from "mongoose";
import User from "../model/UserModel.js";
import { ErrorHandler } from "../_helpers/errorHandler.js";

export const UserChat = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let OldUser = await User.find({ email });
    if (OldUser.length > 0) {
      res.status(400).json({
        status: "Users email already exists.",
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 12);
      await User.create({
        name,
        email,
        password: hashPassword,
      });
      res.status(201).json({
        // user,
        status: "successs",
        message: "User created",
      });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
