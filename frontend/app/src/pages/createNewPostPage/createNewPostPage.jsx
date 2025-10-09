import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageForm from '../../components/ui/imageForm/ImageForm.jsx';
import s from './CreateNewPostPage.module.css';

const CreateNewPostPage = ({ menuCloseModal }) => {
  const navigate = useNavigate();

  const handleCloseModal = (postId) => {
    menuCloseModal();
    navigate(`/posts/${postId}`);
  };

  return (
    <div className={s.createNewPostPage}>
      <h1 className={s.createNewPostTitle}>Create new post</h1>
      <ImageForm closeModal={handleCloseModal} />
    </div>
  );
};

export default CreateNewPostPage;
