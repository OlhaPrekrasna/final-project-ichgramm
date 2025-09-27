import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { loadMessages, sendMessage, getUsersWithChats } from '../controllers/messageController.js';

// Middleware для Socket.IO
export const authenticateSocket = async (socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error('Токен не предоставлен'));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user_id);
    if (!user) return next(new Error('Пользователь не найден'));

    socket.user = user;
    next();
  } catch (err) {
    next(new Error('Неверный токен'));
  }
};

// Обработчики событий Socket.IO
export const messageSocketHandler = (socket, io) => {
  socket.on('joinRoom', async ({ targetUserId }) => {
    const userId = socket.user._id.toString();
    const roomId = [userId, targetUserId].sort().join('_');
    socket.join(roomId);

    await loadMessages(userId, targetUserId, socket);
  });

  socket.on('sendMessage', async ({ targetUserId, messageText }) => {
    const userId = socket.user._id.toString();
    const roomId = [userId, targetUserId].sort().join('_');
    await sendMessage(userId, targetUserId, messageText, roomId, io);
  });
};

const router = express.Router();

router.get('/chats', authMiddleware, getUsersWithChats);

export default router;
