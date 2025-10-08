import s from './ProfileLink.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import noPhoto from '../../../assets/noPhoto.png';

import { logout } from '../../../redux/slices/authSlice.js';
import logoutIcon from '../../../assets/logout.svg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfileLink = () => {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

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
        <span className={s.text}>Profile</span>
      </NavLink>

      {/* Logout */}
      <NavLink
        to="/logout"
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
        onClick={(e) => {
          e.preventDefault();
          handleLogout();
        }}
      >
        <div className={s.iconContainer}>
          <img src={logoutIcon} alt="Logout" className={s.icon} />
        </div>
      </NavLink>
    </nav>
  );
};

export default ProfileLink;
