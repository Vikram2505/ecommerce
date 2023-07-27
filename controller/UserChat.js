import mongoose from "mongoose";
import UserChatModel from "../model/UserChatModel.js";
import { ErrorHandler } from "../_helpers/errorHandler.js";

export const StoreChat = async (data) => {
  console.log(data, "data");
  const { room, author, message } = data;
  if (message) {
    await UserChatModel({
      name: author,
      message: message,
      userId: room,
    }).save();
  }
};

export const GetUserChats = async (req, res) => {
  const { userId } = req.query;
  try {
    const singleChat = await UserChatModel.find({ userId });
    res.status(200).json({
      message: "success",
      chats: singleChat,
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status: "failed",
      message: err.message,
    });
  }
};
