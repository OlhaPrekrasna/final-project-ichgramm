import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { $api } from '../../api/Api.jsx';
import NotificationItem from './NotificationItem.jsx';
import s from './notificationsBar.module.css';

const NotificationsBar = () => {
  const [notifications, setNotifications] = useState(null);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user || !token) {
        setError('User is not authenticated');
        return;
      }

      try {
        const response = await $api.get(
          `/notifications/${user._id}/notifications`
        );
        setNotifications(response.data);
        console.log('Notifications:', response.data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(
          err.response?.data?.error ||
            'An error occurred while fetching notifications'
        );
      }
    };

    fetchNotifications();
  }, [user, token]);

  if (error) return <div className={s.error}>{error}</div>;

  if (!notifications) return <div className={s.loading}>Loading...</div>;

  return (
    <div className={s.notificationsBar}>
      {notifications.length === 0 ? (
        <div className={s.noNotifications}>No notifications</div>
      ) : (
        <ul className={s.notificationsList}>
          {notifications.map((item) => (
            <NotificationItem key={item._id} {...item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsBar;
