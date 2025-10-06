import React from 'react';
import s from './NotificationsPage.module.css';

const NotificationsPage = () => {
  return (
    <div className={s.notificationsPage}>
      <h1 className={s.title}>Notifications</h1>
      <p className={s.subtitle}>Check your latest notifications here.</p>
      <div className={s.notificationsContent}>
        <p className={s.emptyState}>No notifications yet</p>
      </div>
    </div>
  );
};

export default NotificationsPage;
