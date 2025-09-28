import mongoose from 'mongoose';
import User from '../models/userModel.js';
import userRepository from '../repositories/userRepository.js';

// Get user profile
export const getUserProfile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(id).select('-password -created_at');
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
  const {
    username,
    email,
    first_name,
    last_name,
    bio,
    bio_website,
    profile_photo,
  } = req.body;

  const { userId: loggedUserId } = req.user;
  if (loggedUserId !== id) {
    return res.status(403).json({ error: 'Not authorised!' });
  }

  try {
    const updatedUser = await userRepository.updateById(id, {
      username,
      email,
      first_name,
      last_name,
      bio,
      bio_website,
      profile_photo,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User profile successfully updated',
      user: updatedUser,
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

// это рабочая функция

// export const find = async (req, res) => {
//   try {
//     const query = {};

//     if (req.query.email) {
//       query.email = req.query.email;
//     }

//     if (req.query.username) {
//       query.username = req.query.username;
//     }

//     const users = await user.find(query);
//     res.status(200).json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({
//       message: 'Error fetching users',
//       error: error.message,
//     });
//   }
// };

// export const findById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await findOne({ id });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(user);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: 'Error fetching user', error: error.message });
//   }
// };

//////////////////////////////////////////////////////////

// import getUserIdFromToken from '../utils/tokenDecoded.js';
// import { MongoClient } from 'mongodb';
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import crypto from 'crypto';
// import path from 'path';
// import upload from '../middlewares/multer.js';

// AWS
// const s3Client = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// Функция загрузки данных в S3
// const uploadToS3 = async (file) => {
//   const fileExt = path.extname(file.originalname);
//   const fileName = `${crypto.randomUUID()}${fileExt}`;

//   const params = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: fileName,
//     Body: file.buffer,
//     ContentType: file.mimetype,
//     ACL: 'public-read',
//   };

//   await s3Client.send(new PutObjectCommand(params));
//   return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
// };

// Загрузка фото пользователя
// export const uploadUserPhoto = [
//   upload.single('media'),
//   async (req, res) => {
//     try {
//       // Загружен ли файл?
//       if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//       }

//       // Тип файла
//       const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//       if (!allowedMimeTypes.includes(req.file.mimetype)) {
//         return res.status(400).json({ error: 'Invalid file type. Only images are allowed.' });
//       }

//       // Загружаем в S3
//       const fileUrl = await uploadToS3(req.file);

//       // Если нужно, обновим профиль пользователя
//       const userId = getUserIdFromToken(req);
//       if (userId) {
//         await User.findByIdAndUpdate(userId, { profileImage: fileUrl });
//       }

//       return res.json({
//         message: 'File uploaded successfully',
//         url: fileUrl,
//       });
//     } catch (err) {
//       console.error('Error uploading file:', err);
//       return res.status(500).json({ error: 'Error uploading file' });
//     }
//   }
// ];

// export const uploadProfileImage = [
//   upload.single('profile_image'),
//   async (req, res) => {
//     try {
//       if (!req.file) {
//         return res.status(400).json({ error: 'No profile image uploaded' });
//       }

//       const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//       if (!allowedMimeTypes.includes(req.file.mimetype)) {
//         return res.status(400).json({ error: 'Invalid file type. Only images are allowed.' });
//       }

//       const fileUrl = await uploadToS3(req.file);
//       const userId = getUserIdFromToken(req);

//       if (userId) {
//         await User.findByIdAndUpdate(userId, { profileImage: fileUrl });
//       }

//       return res.json({
//         message: 'Profile image uploaded successfully',
//         url: fileUrl,
//       });
//     } catch (err) {
//       console.error('Error uploading profile image:', err);
//       return res.status(500).json({ error: 'Error uploading profile image' });
//     }
//   }
// ];
