import express from 'express';
import {
  getUserNotifications,
  createNotification,
  deleteNotification,
  updateNotificationStatus,
} from '../controllers/notificationController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get all user notifications
// GET http://localhost:3001/api/v1/notifications/:userId
router.get('/:userId', authMiddleware, getUserNotifications);

// Create a new notification
// POST http://localhost:3001/api/v1/notifications
router.post('/', authMiddleware, createNotification);

// Delete a notification
// DELETE http://localhost:3001/api/v1/notifications/:notificationId
router.delete('/:notificationId', authMiddleware, deleteNotification);

// Update notification status (read/unread)
// PUT http://localhost:3001/api/v1/notifications/:notificationId
router.put('/:notificationId', authMiddleware, updateNotificationStatus);

export default router;
