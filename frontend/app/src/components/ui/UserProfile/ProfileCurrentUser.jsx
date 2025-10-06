import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button.jsx';
import Follows from '../../ui/follows/Follows.jsx';
import { logout } from '../../redux/slices/authSlice.js';
import noPhoto from '../../assets/noPhoto.png';
import s from './currentUserProfile.module.css';
import web from '../../assets/web.svg';

const CurrentUserProfile = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [follow, setFollow] = useState({
    followers: 'Loading...',
    following: 'Loading...',
  });

  if (!user) {
    return <div>{t('currentUserProfile.error')}</div>;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const handleChangeFollow = (newFollow) => {
    setFollow(newFollow);
  };

  return (
    <div className={s.currentUserProfile}>
      <span className={s.gradient_border}>
        <span className={s.gradient_border_inner}>
          <img
            src={user.profile_image || noPhoto}
            alt={user.username || 'user avatar'}
          />
        </span>
      </span>

      <div className={s.currentUserProfile_rightside}>
        <div className={s.currentUserProfile_rightside_btnBox}>
          <p>{user.username}</p>
          <Button
            className={s.btn}
            text={t('currentUserProfile.btnEdit')}
            style={{
              fontWeight: 600,
              color: 'var(--color-text-dark)',
              width: '168.72px',
              backgroundColor: 'var(--color-bg-dark-grey)',
            }}
            onClick={handleEditProfile}
          />
          <Button
            className={s.btn}
            text={t('currentUserProfile.btnLogOut')}
            style={{
              width: '168.72px',
              fontWeight: 600,
            }}
            onClick={handleLogout}
          />
        </div>

        <div className={s.currentUserProfile_statistic}>
          <p>
            <span className={s.currentUserProfile_statisticCount}>
              {user.posts_count || 0}
            </span>{' '}
            {t('currentUserProfile.posts')}
          </p>

          <Follows
            userId={user._id}
            follow={follow}
            setFollow={handleChangeFollow}
          />
        </div>

        {user.bio && (
          <p className={s.currentUserProfile_statisticBio}>{user.bio}</p>
        )}

        {user.bio_website && (
          <a
            className={s.webLink}
            href={
              user.bio_website.startsWith('http')
                ? user.bio_website
                : `https://${user.bio_website}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={web} alt="website" />
            {user.bio_website}
          </a>
        )}
      </div>
    </div>
  );
};

export default CurrentUserProfile;
