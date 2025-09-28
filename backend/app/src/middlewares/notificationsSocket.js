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

// Middleware for Socket.IO
export const authenticateSocket = async (socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error('Token not provided'));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user_id);
    if (!user) return next(new Error('User not found'));

    socket.user = user;
    next();
  } catch (err) {
    next(new Error('Invalid token'));
  }
};

// Socket.IO event handlers
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
