import mongoose from "mongoose";
import UserChatModel from "../model/UserChatModel.js";
import { ErrorHandler } from "../_helpers/errorHandler.js";

export const StoreChat = async (data) => {
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
  const { chatId } = req.query;
  try {
    const singleChat = await UserChatModel.find({ userId: chatId });
    res.status(200).json({
      count: singleChat.length,
      chats: singleChat,
      success: true,
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status: "failed",
      message: err.message,
    });
  }
};
