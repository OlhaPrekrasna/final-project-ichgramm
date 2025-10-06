import { useEffect, useState } from 'react';
import { $api } from '../../../api/Api.jsx';
import s from './Follows.module.css';

const Follows = ({ userId, setFollow, follow }) => {
  const [isLoading, setIsLoading] = useState({
    followers: true,
    following: true,
  });

  useEffect(() => {
    const handleGetFollowers = async () => {
      try {
        const response = await $api.get(`/follow/${userId}/followers`);
        setFollow({ ...follow, followers: response.data.length });
        setIsLoading((prev) => ({ ...prev, followers: false }));
      } catch (error) {
        console.error('Error fetching followers:', error);
        setIsLoading((prev) => ({ ...prev, followers: false }));
      }
    };

    const handleGetFollowing = async () => {
      try {
        const response = await $api.get(`/follow/${userId}/following`);
        setFollow({ ...follow, following: response.data.length });
        setIsLoading((prev) => ({ ...prev, following: false }));
      } catch (error) {
        console.error('Error fetching following:', error);
        setIsLoading((prev) => ({ ...prev, following: false }));
      }
    };

    if (follow.followers === 'Loading...') {
      handleGetFollowers();
    } else {
      setIsLoading((prev) => ({ ...prev, followers: false }));
    }

    if (follow.following === 'Loading...') {
      handleGetFollowing();
    } else {
      setIsLoading((prev) => ({ ...prev, following: false }));
    }
  }, [userId, follow, setFollow]);

  return (
    <div className={s.follows}>
      {!isLoading.followers && (
        <p className={s.followItem}>
          <span className={s.count}>{follow.followers}</span>{' '}
          <span className={s.label}>{t('currentUserProfile.followers')}</span>
        </p>
      )}

      {isLoading.followers && (
        <p className={s.followItem}>
          <span className={s.loadingText}>Loading...</span>
        </p>
      )}

      {!isLoading.following && (
        <p className={s.followItem}>
          <span className={s.count}>{follow.following}</span>{' '}
          <span className={s.label}>{t('currentUserProfile.following')}</span>
        </p>
      )}

      {isLoading.following && (
        <p className={s.followItem}>
          <span className={s.loadingText}>Loading...</span>
        </p>
      )}
    </div>
  );
};

export default Follows;
