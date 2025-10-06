import React from 'react';
import ChatRoom from '../../components/ui/chatRoom/ChatRoom.jsx';
import PostListOther from '../../components/ui/postListOther/PostListOther.jsx';
import s from './ChatPage.module.css';

const ChatPage = () => {
  return (
    <div className={s.chatPage}>
      <PostListOther />
      <ChatRoom />
    </div>
  );
};

export default ChatPage;
