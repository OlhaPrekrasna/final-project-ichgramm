import React from 'react';
import s from './NotificationsContent.module.css';

const NotificationsContent = () => {
  const notifications = [
    { id: 1, text: 'Friend request', time: '5 min ago', unread: true },
    { id: 2, text: 'New message', time: '1 hour ago', unread: true },
    { id: 3, text: 'Post liked', time: '2 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h2 className={s.title}>Notifications</h2>
        {unreadCount > 0 && <span className={s.badge}>{unreadCount}</span>}
      </div>

      <div className={s.list}>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`${s.item} ${notification.unread ? s.itemUnread : ''}`}
          >
            <div className={s.dot}></div>
            <div className={s.content}>
              <p className={s.text}>{notification.text}</p>
              <span className={s.time}>{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsContent;
