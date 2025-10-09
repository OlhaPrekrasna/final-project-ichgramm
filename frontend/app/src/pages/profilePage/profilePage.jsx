import ImageGallery from '../../components/ui/imageGallery/ImageGallery.jsx';
import ProfileUser from '../../components/ui/userProfile/ProfileUser.jsx';
import s from './ProfilePage.module.css';

const ProfilePage = () => {
  return (
    <div className={s.profilePage}>
      <ProfileUser />
      <ImageGallery />
    </div>
  );
};

export default ProfilePage;
