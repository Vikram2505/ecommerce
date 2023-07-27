import express from 'express';
import auth from "../middleware/auth.js";
import { GetUserChats } from '../controller/UserChat.js';

const router = express.Router();

/**
 * @desc        Get user chat history
 * @route       /chat/history
 * @requestBody   {"name","email","password"}
 */
router.get("/history", GetUserChats);


export default router;