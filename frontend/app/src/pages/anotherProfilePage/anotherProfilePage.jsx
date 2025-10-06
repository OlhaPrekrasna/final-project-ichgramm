import React from 'react';
import AnotherProfilePage from '../../pages/anotherProfilePage';
import PostsListOther from '../../components/ui/postListOther/PostListOther.jsx';
import s from './AnotherProfilePage.module.css';

const AnotherProfilePage = () => {
  return (
    <div className={s.anotherProfilePage}>
      <AnotherProfilePage />
      <PostsListOther />
    </div>
  );
};

export default AnotherProfilePage;
