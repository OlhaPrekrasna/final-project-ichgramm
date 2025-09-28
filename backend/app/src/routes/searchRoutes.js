import express from 'express';
import { searchUsers, searchPosts } from '../controllers/searchController.js';
// import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Search users by name GET http://localhost:3001/api/v1/search/users?query=alex +
// with autocomplete GET http://localhost:3001/api/v1/search/users?query=a
router.get('/users', searchUsers);

// Search posts by content GET http://localhost:3001/api/v1/search/posts?query=travel +
router.get('/posts', searchPosts);

export default router;
