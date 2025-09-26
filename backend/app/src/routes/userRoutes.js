import express from 'express';
import { find } from '../controllers/userController.js';
import { getUserLikes } from '../controllers/likeController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET /api/v1/user - get users filtered by query params
router.get('/', find);

// GET /api/v1/user/:id/likes
router.get('/:id/likes', authMiddleware, getUserLikes);

// GET /api/v1/user/:id - get user by ID
// router.get('/:id', findById);

// PATCH /api/v1/users/update-email/:id - update user email
// router.patch('/update-email/:id', async (req, res) => {
//   const userId = req.params.id;
//   const { email } = req.body;

//   try {
//     const existingUser = await User.findOne({ email, _id: { $ne: userId } });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email is already in use by another user' });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { email },
//       { new: true, runValidators: true }
//     ).select('-password');

//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json({
//       message: 'User email successfully updated',
//       user: updatedUser,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: 'Error updating user email',
//       error: error.message,
//     });
//   }
// });

// PATCH /api/v1/users/update-profile/:id - update user profile
// router.patch('/update-profile/:id', async (req, res) => {
//   const userId = req.params.id;
//   const { name, bio, website } = req.body;

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { name, bio, website },
//       { new: true, runValidators: true }
//     ).select('-password');

//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json({
//       message: 'User profile successfully updated',
//       user: updatedUser,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: 'Error updating user profile',
//       error: error.message,
//     });
//   }
// });

// POST /api/v1/users/upload-photo - upload user photo
// router.post('/upload-photo', uploadUserPhoto);

// POST /api/v1/users/upload-profile-image - upload profile image
// router.post('/upload-profile-image', uploadProfileImage);

// DELETE /api/v1/users/:id - delete user
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ message: 'User successfully deleted' });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Error deleting user',
//       error: error.message,
//     });
//   }
// });

export default router;
