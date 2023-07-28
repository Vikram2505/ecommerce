import express from "express";
import auth from "../middleware/auth.js";
import { GetAllChatUsers, GetUserChats } from "../controller/UserChat.js";

const router = express.Router();

/**
 * @desc        Get user chat history
 * @route       /chat/history?chatId=
 */
router.get("/history", auth, GetUserChats);

/**
 * @desc        Get user chat history
 * @route       /chat/user-history
 */
router.get("/user-history", auth, GetAllChatUsers);

export default router;
