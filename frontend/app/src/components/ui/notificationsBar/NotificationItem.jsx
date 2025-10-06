import React, { useEffect, useState } from 'react';
import s from './NotificationsBar.module.css';
import { getUserByIdApi } from '../../../api/UserApi.jsx';
import { $api } from '../../../api/Api.jsx';
import parseData from '../../../helpers/parseData';

const NotificationItem = ({
  _id,
  content,
  sender_id,
  created_at,
  is_read,
  type,
}) => {
  const [user, setUser] = useState(null);
  const [read, setRead] = useState(is_read);

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const data = await getUserByIdApi(sender_id);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    handleGetUser();
  }, [sender_id]);

  const handleReadNotification = async () => {
    try {
      await $api.patch(`/notifications/${_id}`, {
        is_read: true,
      });
      setRead(true);
    } catch (error) {
      console.error('Ошибка при чтении уведомления:', error);
    }
  };

  if (!user) {
    return <p className={s.loading}>Loading...</p>;
  }

  return (
    <li
      key={_id}
      className={s.notificationItem}
      style={{ background: !read ? '#0095f680' : '#FFF' }}
    >
      <div className={s.userAvatar_box}>
        <img
          className={s.avatar}
          src={user.profile_image || '/default-avatar.png'}
          alt={user.username || 'User'}
        />
        <div className={s.notificationContent}>
          <p>
            <span className={s.userName}>{user.username}</span> {content}
          </p>
          <p className={s.parsedData}>{parseData(created_at)}</p>
        </div>
      </div>
      <div>
        {!read && (
          <button className={s.readButton} onClick={handleReadNotification}>
            Read
          </button>
        )}
      </div>
    </li>
  );
};

export default NotificationItem;
