import React, { useState } from 'react';
import s from './CreateContent.module.css';
import { ImageForm } from '../../imageForm/ImageForm';

const CreateContent = () => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = (e) => {
    e.preventDefault();
    setIsSharing(true);

    console.log('Sharing post...');

    setTimeout(() => {
      setIsSharing(false);
      alert('Post shared successfully!');
    }, 1000);
  };

  return (
    <div className={s.createContainer}>
      <div className={s.createHeader}>
        <h3 className={s.title}>Create new post</h3>
        <button
          className={`${s.shareButton} ${isSharing ? s.sharing : ''}`}
          onClick={handleShare}
          disabled={isSharing}
        >
          {isSharing ? 'Sharing...' : 'Share'}
        </button>
      </div>
      <div className={s.createBox}>
        <div className={s.createBoxLeft}>
          <div className={s.uploadArea}>
            <div className={s.uploadPlaceholder}>
              <span className={s.uploadIcon}>📷</span>
              <p className={s.uploadText}>Drag photos and videos here</p>
              <button className={s.selectButton}>Select from computer</button>
            </div>
          </div>
        </div>
        <div className={s.createBoxRight}>
          <div className={s.createBoxRightDescription}>
            <div className={s.userInfo}>
              <div className={s.avatar}></div>
              <span className={s.username}>username</span>
            </div>
            <textarea
              className={s.captionInput}
              placeholder="Write a caption..."
              rows="4"
            />
            <div className={s.options}>
              <button className={s.optionButton}>📍 Add location</button>
              <button className={s.optionButton}>👥 Tag people</button>
            </div>
          </div>
          <div className={s.createBoxRightBottom}>
            <ImageForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContent;
