import React, { useState } from 'react';
import EditProfileForm from '../../components/ui/editProfileForm/EditProfileForm.jsx';
import s from './UpdateProfilePage.module.css';

const UpdateProfilePage = () => {
  const [profileData, setProfileData] = useState({
    username: 'ichschool',
    website: 'bit.ly/3rpilibh',
    bio: '- Гарантия помощи с трудоустройством в ведущие IT-компании\n- Выпускники зарабатывают от 45к евро\nБЕСПЛАТНАЯ'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика сохранения данных
    console.log('Profile data saved:', profileData);
  };

  return (
    <div className={s.updateProfilePage}>
      <EditProfileForm
        value={profileData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UpdateProfilePage;

// import React from 'react';
// import EditProfileForm from '../../components/ui/editProfileForm/EditProfileForm.jsx';
// import s from './UpdateProfilePage.module.css';

// const UpdateProfilePage = () => {
//   return (
//     <div className={s.updateProfilePage}>
//       <EditProfileForm />
//     </div>
//   );
// };

// export default UpdateProfilePage;
