import express from 'express';
import {
  createComment,
  deleteComment,
  getPostComments,
  likeComment,
} from '../controllers/commentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Добавить комментарий к посту POST http://localhost:3001/api/v1/comments/:postId/comments
router.post('/:postId/comments', authMiddleware, createComment);

// Получить все комментарии к посту GET http://localhost:3001/api/v1/comments/:postId/comments
router.get('/:postId/comments', authMiddleware, getPostComments);

// Удалить комментарий DELETE http://localhost:3001/api/v1/comments/<commentId>
router.delete('/:commentId', authMiddleware, deleteComment);

// Лайк или анлайк комментария POST http://localhost:3001/api/v1/comments/like/<commentId>
router.post('/like/:commentId', authMiddleware, likeComment);

export default router;
