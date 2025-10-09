import Message from '../models/messageModel.js';

export const loadMessagesSocket = async (userId, targetUserId, socket) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender_id: userId, receiver_id: targetUserId },
        { sender_id: targetUserId, receiver_id: userId },
      ],
    })
      .sort({ created_at: -1 })
      .populate('sender_id', 'username')
      .populate('receiver_id', 'username');

    const roomId = [userId, targetUserId].sort().join('_');
    socket.emit('loadMessages', { roomId, messages });
  } catch (err) {
    console.error(err);
  }
};

export const loadMessagesHTTP = async (userId, targetUserId) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender_id: userId, receiver_id: targetUserId },
        { sender_id: targetUserId, receiver_id: userId },
      ],
    })
      .sort({ created_at: 1 })
      .populate('sender_id', 'username')
      .populate('receiver_id', 'username');

    return messages;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Отправка сообщения через WebSocket
export const sendMessage = async (
  userId,
  targetUserId,
  messageText,
  roomId,
  io
) => {
  try {
    const message = await Message.create({
      sender_id: userId,
      receiver_id: targetUserId,
      text_of_message: messageText,
    });

    const populatedMessage = await message.populate('sender_id', 'username');

    io.to(roomId).emit('newMessage', populatedMessage);
    console.log('Message has been processed');
  } catch (err) {
    console.error(err);
  }
};

// Получение списка чатов пользователя
export const getUsersWithChats = async (req, res) => {
  try {
    const { userId } = req.user;
    const messages = await Message.find({
      $or: [{ sender_id: userId }, { receiver_id: userId }],
    }).populate('sender_id receiver_id', 'username email');

    const chats = {};

    messages.forEach((msg) => {
      const otherUser =
        msg.sender_id._id.toString() === userId.toString()
          ? msg.receiver_id
          : msg.sender_id;
      if (!chats[otherUser._id]) chats[otherUser._id] = [];
      chats[otherUser._id].push(msg);
    });

    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
