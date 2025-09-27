import express from 'express';
import {
  getUserNotifications,
  createNotification,
  deleteNotification,
  updateNotificationStatus,
} from '../controllers/notificationController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Получение всех уведомлений пользователя
// GET http://localhost:3001/api/v1/notifications/:userId
router.get('/:userId', authMiddleware, getUserNotifications);

// Создание нового уведомления +
// POST http://localhost:3001/api/v1/notifications
router.post('/', authMiddleware, createNotification);

// Удаление уведомления
// DELETE http://localhost:3001/api/v1/notifications/:notificationId
router.delete('/:notificationId', authMiddleware, deleteNotification);

// Обновление статуса уведомления (прочитано/непрочитано)
// PUT http://localhost:3001/api/v1/notifications/:notificationId
router.put('/:notificationId', authMiddleware, updateNotificationStatus);

export default router;
