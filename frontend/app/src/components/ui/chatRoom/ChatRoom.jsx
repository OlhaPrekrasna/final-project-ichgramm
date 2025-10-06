import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

import Button from '../../common/Button/Button.jsx';
import messages from '../../../assets/messages.svg';
import {
  changeTimeInLastMessage,
  getUserById,
} from '../../../redux/slices/userSlice.js';
import s from './ChatRoom.module.css';

const socketURL = 'http://localhost:5005';

const ChatRoom = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  const { _id, profile_image: userAvatar } = useSelector(
    (state) => state.auth.user || {}
  );
  const recipient = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const socketRef = useRef(null);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  const targetUserId = location.state?.targetUserId;
  const token = localStorage.getItem('token');

  // Подключение к сокету
  useEffect(() => {
    const socket = io(socketURL, { auth: { token } });
    socketRef.current = socket;

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    return () => socket.disconnect();
  }, [token]);

  // Загрузка сообщений
  useEffect(() => {
    const socket = socketRef.current;
    if (socket && isConnected && targetUserId) {
      socket.emit('joinRoom', { targetUserId });

      const handleLoadMessages = (loadedMessages) =>
        setMessages(loadedMessages);
      socket.on('loadMessages', handleLoadMessages);

      return () => socket.off('loadMessages', handleLoadMessages);
    }
  }, [isConnected, targetUserId]);

  // Приём сообщений
  useEffect(() => {
    const socket = socketRef.current;
    if (socket) {
      const handleReceiveMessage = (newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
      };
      socket.on('receiveMessage', handleReceiveMessage);

      return () => socket.off('receiveMessage', handleReceiveMessage);
    }
  }, []);

  // Получение данных получателя
  useEffect(() => {
    if (targetUserId) dispatch(getUserById(targetUserId));
  }, [targetUserId, dispatch]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleChangeMessage = (e) => {
    setMessageText(e.target.value);
    adjustTextareaHeight();
  };

  const handleSend = () => {
    if (messageText.trim() && targetUserId && socketRef.current) {
      socketRef.current.emit('sendMessage', { targetUserId, messageText });
      setMessageText('');
      adjustTextareaHeight();
      dispatch(
        changeTimeInLastMessage({
          userId: targetUserId,
          lastMessage: new Date().toISOString(),
        })
      );
    } else {
      alert('Please enter a message');
    }
  };

  const handleViewProfile = () => {
    if (recipient && recipient._id) navigate(`/profile/${recipient._id}`);
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const lastMessageDate = messages.length
    ? new Date(
        Math.max(...messages.map((m) => new Date(m.created_at).getTime()))
      )
    : null;

  return (
    <div className={s.messageRoom}>
      {recipient && (
        <>
          <div className={s.recipientInfo}>
            <img
              src={recipient.profile_image}
              alt={recipient.username}
              className={s.profileImage}
            />
            <div>
              <h5>{recipient.username}</h5>
            </div>
          </div>
          <div className={s.recipientInfo_inside}>
            <img
              src={recipient.profile_image}
              alt={recipient.username}
              className={s.profileImage_inside}
            />
            <div>
              <h4>{recipient.username}</h4>
              <p>{recipient.username} • ICHgram</p>
            </div>
            <Button
              text="View profile"
              style={{ color: '#fff', backgroundColor: '#8A2BE2' }}
              onClick={handleViewProfile}
            />
          </div>
        </>
      )}
      {lastMessageDate && (
        <div className={s.lastMessageDate}>
          <p>{lastMessageDate.toLocaleString()}</p>
        </div>
      )}

      {isConnected && targetUserId ? (
        <>
          <ul className={s.list}>
            {messages.map((message) => {
              const isMyMessage = message.sender_id === _id;
              const userImage = isMyMessage
                ? userAvatar
                : recipient?.profile_image;

              return (
                <li
                  key={message._id}
                  className={`${s.list_item} ${
                    isMyMessage ? s.list_item_my : s.list_item_their
                  }`}
                >
                  {!isMyMessage && (
                    <img
                      src={userImage}
                      alt="avatar"
                      className={`${s.avatar} ${s.avatar_their}`}
                    />
                  )}
                  <div
                    className={`${s.message_wrapper} ${
                      isMyMessage ? s.message_my : s.message_their
                    }`}
                  >
                    <span className={s.message_text}>
                      {message.message_text}
                    </span>
                  </div>
                  {isMyMessage && (
                    <img
                      src={userImage}
                      alt="avatar"
                      className={`${s.avatar} ${s.avatar_my}`}
                    />
                  )}
                </li>
              );
            })}
            <div ref={messagesEndRef} />
          </ul>

          <div className={s.form}>
            <textarea
              ref={textareaRef}
              onChange={handleChangeMessage}
              placeholder="Write message"
              value={messageText}
              style={{
                resize: 'none',
                overflow: 'hidden',
                width: '32vw',
                fontSize: '16px',
                height: '44px',
              }}
            />
            <button onClick={handleSend}>
              <img src={mess} alt="send" />
            </button>
          </div>
        </>
      ) : (
        <p>{isConnected ? 'Please select a chat' : 'Connecting to chat...'}</p>
      )}
    </div>
  );
};

export default ChatRoom;
