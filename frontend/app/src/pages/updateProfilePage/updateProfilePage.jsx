import React from 'react';
import EditProfileForm from '../../components/ui/editProfileForm/EditProfileForm.jsx';
import s from './UpdateProfilePage.module.css';

const UpdateProfilePage = () => {
  return (
    <div className={s.updateProfilePage}>
      <EditProfileForm />
    </div>
  );
};

export default UpdateProfilePage;
