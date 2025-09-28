import express from 'express';
import {
  getUserFollowers,
  getUserFollowing,
  followUser,
  unfollowUser,
} from '../controllers/followController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET http://localhost:3001/api/v1/follow/USER_ID/followers +
router.get('/:userId/followers', authMiddleware, getUserFollowers);

// GET http://localhost:3001/api/v1/follow/USER_ID/following +
router.get('/:userId/following', authMiddleware, getUserFollowing);

// POST http://localhost:3001/api/v1/follow/USER_ID/follow/TARGET_USER_ID +
router.post('/:userId/follow/:targetUserId', authMiddleware, followUser);

// DELETE http://localhost:3001/api/v1/follow/USER_ID/unfollow/TARGET_USER_ID +
router.delete('/:userId/unfollow/:targetUserId', authMiddleware, unfollowUser);

export default router;
