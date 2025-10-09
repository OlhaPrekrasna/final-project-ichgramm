import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { loadMessagesHTTP, getUsersWithChats } from '../controllers/messageController.js';

const router = express.Router();

router.get('/chats', authMiddleware, getUsersWithChats);

router.get('/:userId/:targetUserId', authMiddleware, async (req, res) => {
  const { userId, targetUserId } = req.params;

  try {
    const messages = await loadMessagesHTTP(userId, targetUserId);
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;


