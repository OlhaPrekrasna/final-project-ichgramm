import express from 'express';
import upload from '../middlewares/multer.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  createPost,
  createPostWithMedia,
  getPostById,
  updatePost,
  deletePost,
  getUserPosts,
  getAllPosts,
  getOtherUserPosts,
  getFollowingPosts,
} from '../controllers/postController.js';

const router = express.Router();

// Создание поста с одним изображением
router.post('/', authMiddleware, upload.single('image'), createPost);

// Создание поста с несколькими медиа (до 5 файлов)
router.post(
  '/media',
  authMiddleware,
  upload.array('media', 5),
  createPostWithMedia
);

// Получение поста по ID
router.get('/post/:postId', authMiddleware, getPostById);

// Получение всех постов текущего пользователя
router.get('/user/me', authMiddleware, getUserPosts);

// Получение всех постов (публичные)
router.get('/all', getAllPosts);

// Получение постов другого пользователя по ID
router.get('/user/:userId', authMiddleware, getOtherUserPosts);

// Получение постов пользователей, на которых подписан текущий юзер
router.get('/following', authMiddleware, getFollowingPosts);

// Обновление поста
router.put('/post/:postId', authMiddleware, upload.single('image'), updatePost);

// Удаление поста
router.delete('/post/:postId', authMiddleware, deletePost);

export default router;
