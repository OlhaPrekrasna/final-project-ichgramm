import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import {
  loadMessagesSocket,
  sendMessage,
} from '../controllers/messageController.js';

export const notificationSocketHandler = (socket, io) => {
  socket.on('joinNotifications', (userId) => {
    socket.join(`notifications:${userId}`);
    console.log(`User ${userId} joined notifications room`);
  });

  socket.on('leaveNotifications', (userId) => {
    socket.leave(`notifications:${userId}`);
    console.log(`User ${userId} left notifications room`);
  });
};

// Function to send a notification to a specific user
export const emitNotification = (io, userId, notification) => {
  io.to(`notifications:${userId}`).emit('newNotification', notification);
};

// Middleware for Socket.IO authentication
export const authenticateSocket = async (socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error('Token not provided'));

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    const user = await User.findById(decoded.id);
    if (!user) return next(new Error('User not found'));

    socket.user = user;
    next();
  } catch (err) {
    next(new Error(`Fail to verify token: ${err.message}`));
  }
};

// Socket.IO event handlers for chat

export const messageSocketHandler = (socket, io, user) => {
  const { id: userId } = user;

  socket.on('joinRoom', async ({ targetUserId }) => {
    const roomId = [userId, targetUserId].sort().join('_');
    socket.join(roomId);

    console.log(`User ${userId} joined room ${roomId}`);

    // Загружаем историю сообщений
    await loadMessagesSocket(userId, targetUserId, socket);
  });

  socket.on('sendMessage', async ({ targetUserId, messageText }) => {
    if (!targetUserId || !messageText) {
      console.log(
        `Empty targetUserId (${targetUserId}) or messageText (${messageText})`
      );
      return;
    }

    const roomId = [userId, targetUserId].sort().join('_');
    await sendMessage(userId, targetUserId, messageText, roomId, io);
  });
};
