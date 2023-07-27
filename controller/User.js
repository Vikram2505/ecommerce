import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../model/UserModel.js";
import { ErrorHandler } from "../_helpers/errorHandler.js";

const secret = "test";

// @desc        create user
// @route       /user/signup
export const SignUp = async (req, res) => {
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

// @desc        login user
// @route       /user/signin
export const SignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const OldUser = await User.findOne({ email });
    if (!OldUser) {
      throw new ErrorHandler(404, "User dosen't exists");
    }
    const isCorrectPassword = await bcrypt.compare(password, OldUser.password);
    if (!isCorrectPassword) {
      throw new ErrorHandler(201, "Invalid password");
    }
    const token = jwt.sign(
      {
        email: OldUser.email,
        id: OldUser._id,
        role: OldUser.role,
        userBlocked: OldUser.userBlocked,
      },
      secret
    );
    if (OldUser.userBlocked) {
      return res.status(200).json({
        token,
        userBlocked: OldUser.userBlocked,
      });
    }
    res.status(200).json({
      token,
      userName: OldUser?.name,
      userId: OldUser._id,
      email: OldUser.email,
      userBlocked: OldUser.userBlocked,
      status: "success",
    });
  } catch (err) {
    // next(new ErrorHandler(err.statusCode || 500, err.message));
    res.status(err.statusCode).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const AllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("_id name userBlocked email createdAt role")
      .exec();
    res.status(200).json({
      count: users.length,
      users,
      status: "success",
      message: "All users",
    });
  } catch (err) {
    // new ErrorHandler(500, err.message, "failed");
    next(new ErrorHandler(err.statusCode || 500, err.message));
  }
};

// @desc        block user
// @route       /user/block-user/:id
export const BlockUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "failed",
        message: `User not exists with id: ${id}`,
      });
    }
    const user = await User.findById(id);
    let block;
    if (user.userBlocked) {
      block = false;
    } else {
      block = true;
    }
    await User.findByIdAndUpdate(
      id,
      { userBlocked: block },
      {
        new: true,
      }
    );

    res.status(201).json({
      status: "success",
      blockStatus: block,
      message: block
        ? "User blocked Successfully"
        : "User Un-blocked Successfully",
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

export const GoogleSignIn = async (req, res) => {
  const { email, name, token, googleId } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      const result = { _id: oldUser._id.toString(), email, name };
      return res.status(200).json({ result, token });
    }
    const result = await User.create({
      email,
      name,
      id: googleId,
    });
    res.status(201).json({
      status: "success",
      result,
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
