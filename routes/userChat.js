import express from 'express';
import auth from "../middleware/auth.js";
import { GetUserChats } from '../controller/UserChat.js';

const router = express.Router();

/**
 * @desc        Get user chat history
 * @route       /chat/history?chatId=
 */
router.get("/history", auth, GetUserChats);


export default router;