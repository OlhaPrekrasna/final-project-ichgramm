import express from 'express';
import {
  signup,
  login,
  logout,
  updatePassword,
  forgotPassword,
  resetPassword,
  checkUser,
} from '../controllers/authController.js';

const router = express.Router();

// POST /api/v1/auth/signup - create a user
router.post('/signup', signup);

// POST /api/v1/auth/signin -  login user
router.post('/signin', login);

// POST /api/v1/auth/logout -  login user
router.post('/logout', logout);

// POST /api/v1/auth/update-password - update password +
router.post('/update-password', updatePassword);

// POST /api/v1/auth/forgot-password +
router.post('/forgot-password', forgotPassword);

// GET /api/v1/auth/reset-password
router.get('/reset-password', resetPassword);

// POST /api/v1/auth/check-user
router.post('/check-user', checkUser);


export default router;

// import express from 'express';
// import {
//   signup,
//   login,
//   updatePassword,
//   forgotPassword,
//   resetPassword,
// } from '../controllers/authController.js';

// const router = express.Router();

// // POST /api/v1/auth/signup - create a user
// router.post('/signup', signup);

// // POST /api/v1/auth/signin -  login user
// router.post('/signin', login);

// // POST /api/v1/auth/update-password - update password
// router.post('/update-password', updatePassword);

// // POST /api/v1/auth/forgot-password
// router.post('/forgot-password', forgotPassword);

// // GET /api/v1/auth/reset-password
// router.get('/reset-password', resetPassword);

// // router.post('/check-user', checkUser)
// // router.post('/update-password', updatePassword)

// export default router;
