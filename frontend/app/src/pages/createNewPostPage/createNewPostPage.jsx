import React from 'react';
import { ImageForm } from '../../components/ui/imageForm/ImageForm.jsx';
import s from './CreateNewPostPage.module.css';

const CreateNewPostPage = () => {
  return (
    <div className={s.createNewPostPage}>
      <h1 className={s.createNewPostTitle}>Create new post</h1>
      <ImageForm />
    </div>
  );
};

export default CreateNewPostPage;
