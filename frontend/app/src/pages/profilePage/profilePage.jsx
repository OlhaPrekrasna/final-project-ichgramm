import React from 'react';
import ImageGallery from '../../components/ui/imageGallery/ImageGallery.jsx';
import ProfileCurrentUser from '../../components/ui/userProfile/ProfileCurrentUser.jsx';
import s from './ProfilePage.module.css';

const ProfilePage = () => {
  return (
    <div className={s.profilePage}>
      <ProfileCurrentUser />
      <ImageGallery />
    </div>
  );
};

export default ProfilePage;
