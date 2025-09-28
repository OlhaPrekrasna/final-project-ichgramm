import express from 'express';
import {
  createComment,
  deleteComment,
  getPostComments,
  likeComment,
} from '../controllers/commentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Add a comment to a post POST http://localhost:3001/api/v1/comments/:postId/comments
router.post('/:postId/comments', authMiddleware, createComment);

// Get all comments for a post GET http://localhost:3001/api/v1/comments/:postId/comments
router.get('/:postId/comments', authMiddleware, getPostComments);

// Delete a comment DELETE http://localhost:3001/api/v1/comments/<commentId>
router.delete('/:commentId', authMiddleware, deleteComment);

// Like or unlike a comment POST http://localhost:3001/api/v1/comments/like/<commentId>
router.post('/like/:commentId', authMiddleware, likeComment);

export default router;

