import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  loadMessages,
  sendMessage,
  getUsersWithChats,
} from '../controllers/messageController.js';

const router = express.Router();

router.get('/chats', authMiddleware, getUsersWithChats);

export default router;
