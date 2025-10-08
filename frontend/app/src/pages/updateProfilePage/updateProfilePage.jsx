import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProfileForm from '../../components/ui/editProfileForm/EditProfileForm.jsx';
import s from './UpdateProfilePage.module.css';

const UpdateProfilePage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    username: 'ichschool',
    website: 'bit.ly/3rpilibh',
    bio: '- Гарантия помощи с трудоустройством в ведущие IT-компании\n- Выпускники зарабатывают от 45к евро\nБЕСПЛАТНАЯ',
    avatar: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (file) => {
    // Создаем URL для предпросмотра изображения
    const imageUrl = URL.createObjectURL(file);
    setProfileData((prev) => ({
      ...prev,
      avatar: imageUrl,
      avatarFile: file // сохраняем файл для отправки на сервер
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Имитация API запроса
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Здесь обычно отправляем данные на сервер
      // const formData = new FormData();
      // formData.append('username', profileData.username);
      // formData.append('website', profileData.website);
      // formData.append('bio', profileData.bio);
      // if (profileData.avatarFile) {
      //   formData.append('avatar', profileData.avatarFile);
      // }
      
      console.log('Profile data to save:', {
        ...profileData,
        avatarFile: profileData.avatarFile ? 'File selected' : 'No file'
      });
      
      // Показываем сообщение об успехе
      setShowSuccessMessage(true);
      
      // Через 2 секунды переходим на страницу профиля
      setTimeout(() => {
        navigate('/profile'); // Замените на ваш путь к странице профиля
      }, 2000);
      
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={s.updateProfilePage}>
      {showSuccessMessage && (
        <div className={s.successMessage}>
          <div className={s.successContent}>
            <div className={s.successIcon}>✓</div>
            <div className={s.successText}>Profile successfully updated!</div>
            <div className={s.redirectText}>Redirecting to profile page...</div>
          </div>
        </div>
      )}
      
      <EditProfileForm
        value={profileData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        onPhotoChange={handlePhotoChange}
      />
    </div>
  );
};

export default UpdateProfilePage;

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import EditProfileForm from '../../components/ui/editProfileForm/EditProfileForm.jsx';
// import s from './UpdateProfilePage.module.css';

// const UpdateProfilePage = () => {
//   const navigate = useNavigate();
//   const [profileData, setProfileData] = useState({
//     username: 'ichschool',
//     website: 'bit.ly/3rpilibh',
//     bio: '- Гарантия помощи с трудоустройством в ведущие IT-компании\n- Выпускники зарабатывают от 45к евро\nБЕСПЛАТНАЯ'
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
    
//     // Имитация API запроса
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Показываем сообщение об успехе
//       setShowSuccessMessage(true);
      
//       // Через 2 секунды переходим на страницу профиля
//       setTimeout(() => {
//         navigate('/profile'); // Замените на ваш путь к странице профиля
//       }, 2000);
      
//     } catch (error) {
//       console.error('Error saving profile:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className={s.updateProfilePage}>
//       {showSuccessMessage && (
//         <div className={s.successMessage}>
//           <div className={s.successContent}>
//             <div className={s.successIcon}>✓</div>
//             <div className={s.successText}>Profile successfully updated!</div>
//             <div className={s.redirectText}>Redirecting to profile page...</div>
//           </div>
//         </div>
//       )}
      
//       <EditProfileForm
//         value={profileData}
//         onChange={handleInputChange}
//         onSubmit={handleSubmit}
//         isSubmitting={isSubmitting}
//       />
//     </div>
//   );
// };

// export default UpdateProfilePage;


