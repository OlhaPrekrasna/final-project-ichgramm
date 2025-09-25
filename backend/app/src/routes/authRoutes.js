import express from 'express';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

// POST /api/v1/auth/signup - create a user
router.post('/signup', signup);

router.post('/signin', login);
// router.post('/check-user', checkUser)
// router.post('/update-password', updatePassword)

export default router;