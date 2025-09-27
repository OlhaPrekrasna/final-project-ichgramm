import express from 'express';
import { searchUsers, searchPosts } from '../controllers/searchController.js';
// import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Поиск пользователей по имени GET http://localhost:3001/api/v1/search/users?query=alex +
// с автозаполнением GET http://localhost:3001/api/v1/search/users?query=a

router.get('/users', searchUsers);

// Поиск постов по содержимому GET http://localhost:3001/api/v1/search/posts?query=travel +
router.get('/posts', searchPosts);

export default router;
