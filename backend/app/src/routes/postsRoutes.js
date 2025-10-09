import express from 'express';
// import upload from '../middlewares/multer.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';
import {
  createPost,
  // createPostWithMedia,
  getPostById,
  updatePost,
  deletePost,
  getUserPosts,
  getAllPosts,
  getOtherUserPosts,
  // getFollowingPosts,
} from '../controllers/postController.js';
import { getPostLikes, toggleLikePost } from '../controllers/likeController.js';

const router = express.Router();

// Получение всех постов (публичные)
router.get('/', getAllPosts);

// Получение поста по ID
router.get('/:postId', authMiddleware, getPostById);

// Получение всех постов текущего пользователя
router.get('/user/me', authMiddleware, getUserPosts);

// Получение постов другого пользователя по ID
router.get('/user/:userId', authMiddleware, getOtherUserPosts);

// Получение постов пользователей, на которых подписан текущий юзер
// router.get('/following', authMiddleware, getFollowingPosts);

// Создание поста с одним изображением
// router.post('/', authMiddleware, upload.single('image'), createPost);
router.post(
  '/',
  [authMiddleware, uploadMiddleware.single('image')],
  createPost
);

// Создание поста с несколькими медиа (до 5 файлов)
// router.post(
//   '/media',
//   authMiddleware,
//   upload.array('media', 5),
//   createPostWithMedia
// );

// Обновление поста
// router.put('/posts/:postId', authMiddleware, upload.single('image'), updatePost);
router.put('/:postId', authMiddleware, updatePost);

// Удаление поста
router.delete('/:postId', authMiddleware, deletePost);

// Получение поста по ID -> likes
router.get('/:postId/likes', authMiddleware, getPostLikes);

// Toggle like/unlike a post
// router.post('/:postId/:userId', authMiddleware, toggleLikePost);
router.post('/:postId/likes', authMiddleware, toggleLikePost);

export default router;
