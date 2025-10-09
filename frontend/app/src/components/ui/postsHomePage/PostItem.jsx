import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegComment } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button.jsx';
import { $api } from '../../../api/Api.jsx';
import avaImage from '../../../assets/noPhoto.png';
import background from '../../../assets/background.png';
import parseData from '../../../helpers/parseData.jsx';
import styles from './PostItem.module.css';

const PostItem = ({
  item,
  author,
  likesCount,
  setLikesCount,
  onClick,
  listFollowing,
  handleAddSomeFollow,
  handleRemoveSomeFollow,
  userLikes,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const { _id: currentUserId } = currentUser || {};
  const userId =
    typeof item.user_id === 'string' ? item.user_id : item.user_id?._id || '';

  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    const userHasLiked = userLikes.includes(item._id);
    setIsLiked(userHasLiked);

    if (userHasLiked) {
      setLikesCount(1);
    } else {
      setLikesCount(likesCount || 0);
    }
  }, [item._id, userLikes, likesCount]);

  useEffect(() => {
    if (listFollowing && userId) {
      setIsFollowing(listFollowing.includes(userId));
    }
  }, [currentUserId, userId, listFollowing]);

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!currentUserId) return;

    try {
      await $api.post(`/posts/${item._id}/likes`);

      if (isLiked) {
        const newCount = Math.max(0, likesCount - 1);

        setLikesCount(item._id, newCount);
      } else {
        const newCount = likesCount + 1;

        setLikesCount(item._id, newCount);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error while updating like:', error);
    }
  };

  const handleFollow = async (e) => {
    e.stopPropagation();
    if (!currentUserId || !userId) return;
    try {
      const response = await $api.post(
        `/follow/${currentUserId}/follow/${userId}`
      );
      if (response.status === 201) {
        setIsFollowing(true);
      }
      handleAddSomeFollow(userId);
    } catch (error) {
      console.error('Error while following:', error);
    }
  };

  const handleUnfollow = async (e) => {
    e.stopPropagation();
    if (!currentUserId || !userId) return;
    try {
      const response = await $api.delete(
        `/follow/${userId}/unfollow/${currentUserId}`
      );
      if (response.status === 200) {
        setIsFollowing(false);
      }
      handleRemoveSomeFollow(userId);
    } catch (error) {
      console.error('Error while unfollowing:', error);
    }
  };

  const handleClickToFollow = (e) => {
    e.stopPropagation();
    if (isFollowing) {
      handleUnfollow(e);
    } else {
      handleFollow(e);
    }
  };

  const handlePostClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/posts/${item._id}`);
    }
  };

  const handleUserClick = (e) => {
    e.stopPropagation();
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  return (
    <li className={styles.postItem} onClick={handlePostClick}>
      <div className={styles.header}>
        <div className={styles.avatarContainer}>
          <img
            src={author.profile_photo || avaImage}
            alt="avatar"
            className={styles.avatar}
            onClick={handleUserClick}
          />
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName} onClick={handleUserClick}>
            {author.username}
          </span>
          <span className={styles.greyText}>
            • {parseData(item.created_at)} •
          </span>
          {isFollowing !== null && userId !== currentUserId && (
            <Button
              text={isFollowing ? 'Unfollow' : 'Follow'}
              style={{
                fontWeight: 600,
                color: 'var(--color-text-blue)',
                backgroundColor: 'transparent',
              }}
              onClick={handleClickToFollow}
            />
          )}
        </div>
      </div>

      <div className={styles.imgPost}>
        <img
          src={item.image_url || background}
          alt="Post"
          className={styles.postImage}
        />
      </div>

      <div className={styles.bottomBlock}>
        <div className={styles.actions}>
          <FaHeart
            className={`${styles.likeIcon} ${
              isLiked ? styles.liked : styles.unliked
            }`}
            onClick={handleLike}
            size={20}
          />
          <span className={styles.likesCount}>{likesCount} likes</span>
        </div>
        <div className={styles.caption}>
          <span className={styles.bold} onClick={handleUserClick}>
            {item.user_name}
          </span>
        </div>
      </div>
    </li>
  );
};

export default PostItem;
