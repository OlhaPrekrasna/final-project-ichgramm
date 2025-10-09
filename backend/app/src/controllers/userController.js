import mongoose from 'mongoose';
import User from '../models/userModel.js';
import userRepository from '../repositories/userRepository.js';
import generateToken from '../utils/createJWT.js';

// Get user profile
export const getUserProfile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(id)
      .select('-password -created_at')
      .populate('count_of_posts')
      .populate('count_of_followers')
      .populate('count_of_following');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching user profile',
      error: error.message,
    });
  }
};

// Get user list (example)
export const find = async (req, res) => {
  try {
    const users = await userRepository.find(req.query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching user list',
      error: error.message,
    });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { username, email, first_name, last_name, bio, bio_website } = req.body;

  const { userId: loggedUserId } = req.user;
  if (loggedUserId !== id) {
    return res.status(403).json({ error: 'Not authorised!' });
  }

  const profilePhotoDto = {};
  if (req.file) {
    const { location: imageUrl, key: imageFile } = req.file;
    profilePhotoDto['profile_photo'] = imageUrl;
    profilePhotoDto['profile_key'] = imageFile;
  }

  console.log(profilePhotoDto);

  try {
    const updatedUser = await userRepository.updateById(id, {
      username,
      email,
      first_name,
      last_name,
      bio,
      bio_website,
      ...profilePhotoDto,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = generateToken({ id });

    res.json({
      message: 'User profile successfully updated',
      user: updatedUser,
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating user profile',
      error: error.message,
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const { userId: loggedUserId } = req.user;
  if (loggedUserId !== id) {
    return res.status(403).json({ error: 'Not authorised!' });
  }

  try {
    const deletedUser = await userRepository.deleteById(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User successfully deleted' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting user',
      error: error.message,
    });
  }
};

// Загрузка фото пользователя
export const uploadProfilePhoto = async (req, res) => {
  try {
    // Загружен ли файл?
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Тип файла
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res
        .status(400)
        .json({ error: 'Invalid file type. Only images are allowed.' });
    }

    // Загружаем в S3
    const fileUrl = req.file.location;

    // Если нужно, обновим профиль пользователя
    const userId = req.user.userId;
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        profile_photo: fileUrl,
      });
    }

    return res.json({
      message: 'File uploaded successfully',
      url: fileUrl,
    });
  } catch (err) {
    console.error('Error uploading file:', err);
    return res
      .status(500)
      .json({ error: `Error uploading file: ${err.message}` });
  }
};
