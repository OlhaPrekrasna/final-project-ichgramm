import express from 'express';
import {
  find,
  getUserProfile,
  updateProfile,
  uploadProfilePhoto,
  deleteUser,
} from '../controllers/userController.js';
import { getUserLikes } from '../controllers/likeController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// GET /api/v1/user - список пользователей +
router.get('/', find);

// GET /api/v1/user/:id - профиль пользователя +
router.get('/:id', getUserProfile);

// PUT /api/v1/user/:id - update user profile +
router.put(
  '/:id',
  [authMiddleware, uploadMiddleware.single('avatar')],
  updateProfile
);

// PUT /api/v1/user/upload-photo - upload user photo
// router.put('/:id/upload-photo', authMiddleware, uploadProfilePhoto);
// router.put(
//   '/:id/upload-photo',
//   [authMiddleware, uploadMiddleware.single('profile')],
//   uploadProfilePhoto
// );

// DELETE /api/v1/users/:id - delete user +
router.delete('/:id', authMiddleware, deleteUser);

// GET /api/v1/user/:id/likes - лайки пользователя +
router.get('/:id/likes', authMiddleware, getUserLikes);

export default router;
