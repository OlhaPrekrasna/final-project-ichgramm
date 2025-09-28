import { emitNotification } from '../middlewares/notificationsSocket.js';
import Notification from '../models/notificationModel.js';
import User from '../models/userModel.js';

// Get all user notifications +
export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user_id: req.params.userId,
    }).sort({ created_at: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: error.message });
  }
};

// Create a new notification +
export const createNotification = async (req, res) => {
  const { user_id, sender_id, type, text_content, is_read } = req.body;

  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const notification = new Notification({
      user_id,
      sender_id,
      type,
      text_content,
      is_read: is_read ?? false,
      created_at: new Date(),
    });

    await notification.save();

    // Send notification via WebSocket
    const io = req.app.get('io');
    emitNotification(io, user_id, notification);

    res.status(201).json(notification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete notification +
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    await Notification.findByIdAndDelete(req.params.notificationId);
    res.status(200).json({ message: 'Notification deleted' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update notification status (read/unread) +
export const updateNotificationStatus = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    notification.is_read = req.body.is_read ?? notification.is_read;
    await notification.save();

    res.status(200).json(notification);
  } catch (error) {
    console.error('Error updating notification status:', error);
    res.status(500).json({ error: error.message });
  }
};
