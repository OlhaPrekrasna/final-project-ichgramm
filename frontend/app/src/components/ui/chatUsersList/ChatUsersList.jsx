import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsersWithChats } from '../../../redux/slices/userSlice.js';
import s from './chatUsersList.module.css';
import parseData from '../../helpers/parseData';

const ChatUsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.user);
  const { username } = useSelector((state) => state.auth.user);

  const [activeUserId, setActiveUserId] = useState(() =>
    localStorage.getItem('activeUserId')
  );

  useEffect(() => {
    dispatch(getUsersWithChats());
  }, [dispatch]);

  const handleSelectUser = (targetUserId, lastMessageDate) => {
    setActiveUserId(targetUserId);
    localStorage.setItem('activeUserId', targetUserId);
    navigate('/messages', { state: { targetUserId, lastMessageDate } });
  };

  const getLastMessageDate = (messages) => {
    if (!messages || messages.length === 0) {
      return null;
    }

    try {
      const timestamps = messages
        .map((message) => new Date(message.created_at).getTime())
        .filter((time) => !isNaN(time));

      if (timestamps.length === 0) {
        return null;
      }

      const lastMessageTimestamp = Math.max(...timestamps);
      const lastMessageDate = new Date(lastMessageTimestamp);

      return lastMessageDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      console.error('Error processing message dates:', error);
      return null;
    }
  };

  const getLastMessageText = (messages) => {
    if (!messages || messages.length === 0) {
      return 'No messages yet';
    }

    const lastMessage = messages[messages.length - 1];
    return lastMessage.message_text || 'Message';
  };

  if (loading) {
    return <div className={s.loading}>Loading...</div>;
  }

  if (error) {
    console.error('An error occurred:', error);
    return <div className={s.error}>Error: {error}</div>;
  }

  return (
    <div className={s.chatUsersList}>
      <h4 className={s.title}>{username}</h4>
      {user && user.length > 0 ? (
        <ul className={s.usersList}>
          {user.map((chatUser) => {
            const isActive = chatUser._id === activeUserId;
            const lastMessageDate = getLastMessageDate(chatUser.messages);
            const lastMessageText = getLastMessageText(chatUser.messages);

            return (
              <li
                className={`${s.userItem} ${isActive ? s.active : ''}`}
                key={chatUser._id}
                onClick={() => handleSelectUser(chatUser._id, lastMessageDate)}
              >
                <div className={s.avatarContainer}>
                  <img
                    className={s.avatar}
                    src={chatUser.profile_photo || '/default-avatar.png'}
                    alt={chatUser.username}
                    onError={(e) => {
                      e.target.src = '/default-avatar.png';
                    }}
                  />
                </div>
                <div className={s.userInfo}>
                  <p className={s.username}>{chatUser.username}</p>
                  <p className={s.lastMessage}>
                    {lastMessageText}
                    {lastMessageDate && (
                      <span className={s.messageDate}>
                        {' '}
                        • {lastMessageDate}
                      </span>
                    )}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className={s.noUsers}>
          <p>No chats yet</p>
        </div>
      )}
    </div>
  );
};

export default ChatUsersList;
