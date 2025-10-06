import s from './ProfileLink.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import noPhoto from '../../assets/noPhoto.png';

const ProfileLink = () => {
  const user = useSelector((state) => state.auth.user);
  const { t } = useTranslation();

  return (
    <nav className={s.profileLink}>
      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
      >
        <div className={s.photoContainer}>
          <img
            src={user?.profile_image || noPhoto}
            alt={user?.username || 'Profile'}
            className={s.photo}
            onError={(e) => {
              e.target.src = noPhoto;
            }}
          />
        </div>
        <span className={s.text}>{t('profileLink.profile')}</span>
      </NavLink>
    </nav>
  );
};

export default ProfileLink;
