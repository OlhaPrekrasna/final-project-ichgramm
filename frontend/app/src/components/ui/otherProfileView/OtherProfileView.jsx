import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button.jsx';
import Follows from '../../ui/follows/Follows.jsx';
import { getUserById } from '../../../redux/slices/userSlice.js';
import { $api } from '../../api/Api.jsx';
import noPhoto from '../../assets/noPhoto.png';
import web from '../../assets/web.svg';
import s from './OtherProfileView.module.css';

export default function OtherProfileView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isFollowing, setIsFollowing] = useState(false);
  const { t } = useTranslation();
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const { _id } = useSelector((state) => state.auth.user || {});
  const [follow, setFollow] = useState({
    followers: 'Loading...',
    following: 'Loading...',
  });

  useEffect(() => {
    if (_id === userId) {
      navigate('/profile');
    }
  }, [_id, userId, navigate]);

  useEffect(() => {
    setFollow({
      followers: 'Loading...',
      following: 'Loading...',
    });
  }, [userId]);

  useEffect(() => {
    const handleCheckMyFollowing = async () => {
      if (_id && userId) {
        const response = await $api.get(`/follow/${userId}/followers`);
        const data = response.data.map((item) => item.follower_user_id._id);
        setIsFollowing(data.includes(_id));
      }
    };
    handleCheckMyFollowing();
  }, [_id, userId]);

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
    }
  }, [dispatch, userId]);

  const handleChangeFollow = (newFollow) => {
    setFollow(newFollow);
  };

  const handleFollow = async () => {
    const response = await $api.post(`/follow/${_id}/follow/${userId}`);
    if (response.status === 201) {
      setIsFollowing(true);
      setFollow((prev) => ({
        ...prev,
        followers:
          prev.followers !== 'Loading...' ? prev.followers + 1 : prev.followers,
      }));
    }
  };

  const handleUnfollow = async () => {
    const response = await $api.delete(`/follow/${userId}/unfollow/${_id}`);
    if (response.status === 200) {
      setIsFollowing(false);
      setFollow((prev) => ({
        ...prev,
        followers:
          prev.followers !== 'Loading...' ? prev.followers - 1 : prev.followers,
      }));
    }
  };

  const handleMessage = () => {
    if (userId) {
      navigate('/messages', { state: { targetUserId: userId } });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {currentUser ? (
        <div className={s.otherProfile}>
          <span className={s.gradient_border}>
            <span className={s.gradient_border_inner}>
              <img
                src={currentUser.profile_photo || noPhoto}
                alt={currentUser.username}
              />
            </span>
          </span>
          <div className={s.otherProfile_rightside}>
            <div className={s.otherProfile_rightside_btnBox}>
              <p>{currentUser.username}</p>
              <Button
                text={
                  isFollowing
                    ? t('otherProfile.unfollow')
                    : t('otherProfile.follow')
                }
                style={{
                  fontWeight: 600,
                  color: 'var(--color-text-dark)',
                  width: '168.72px',
                  backgroundColor: 'var(--color-bg-dark-grey)',
                }}
                onClick={isFollowing ? handleUnfollow : handleFollow}
              />
              <Button
                text={t('otherProfile.message')}
                style={{ width: '168.72px' }}
                onClick={handleMessage}
              />
            </div>
            <div className={s.otherProfile_statistic}>
              <p>
                <span className={s.otherProfile_statisticCount}>
                  {currentUser.posts_count}
                </span>{' '}
                {t('otherProfile.posts')}
              </p>

              <Follows
                userId={userId || ''}
                follow={follow}
                setFollow={handleChangeFollow}
              />
            </div>
            <p className={s.otherProfile_statisticBio}>{currentUser.bio}</p>
            {currentUser.bio_website && (
              <a className={s.webLink} href={currentUser.bio_website}>
                <img src={web} alt="" />
                {currentUser.bio_website}
              </a>
            )}
          </div>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
}
