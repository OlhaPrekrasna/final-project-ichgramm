import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegComment } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Добавляем useNavigate
import Button from '../../common/Button/Button.jsx';
import { $api } from '../../../api/Api.jsx';
import avaImage from '../../../assets/noPhoto.png';
import background from '../../../assets/background.png';
import parseData from '../../../helpers/parseData.jsx';
import styles from './PostItem.module.css';

const PostItem = ({
  item,
  likesCount: initialLikesCount,
  setLikesCount,
  onClick,
  listFollowing,
  handleAddSomeFollow,
  handleRemoveSomeFollow,
  userLikes,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLocalLikesCount] = useState(initialLikesCount || 0);
  const currentUser = useSelector((state) => state.auth.user);
  const { _id: currentUserId } = currentUser || {};
  const userId =
    typeof item.user_id === 'string' ? item.user_id : item.user_id?._id || '';
  
  const navigate = useNavigate(); // Добавляем навигацию

  const [isFollowing, setIsFollowing] = useState(null);

  // Убираем условие скрытия своих постов, если нужно показывать все посты
  // if (userId === currentUserId) return null;

  // Инициализация состояния лайков
  useEffect(() => {
    const userHasLiked = userLikes.includes(item._id);
    setIsLiked(userHasLiked);
    
    // Корректируем количество лайков если нужно
    if (userHasLiked && initialLikesCount === 0) {
      setLocalLikesCount(1);
    } else {
      setLocalLikesCount(initialLikesCount || 0);
    }
  }, [item._id, userLikes, initialLikesCount]);

  useEffect(() => {
    if (listFollowing && userId) {
      setIsFollowing(listFollowing.includes(userId));
    }
  }, [currentUserId, userId, listFollowing]);

  const handleLike = async (e) => {
    e.stopPropagation(); // Останавливаем всплытие чтобы не открывался пост при лайке
    if (!currentUserId) return;

    try {
      await $api.post(`/posts/${item._id}/likes`);
      
      if (isLiked) {
        // Убираем лайк
        const newCount = Math.max(0, likesCount - 1);
        setLocalLikesCount(newCount);
        setLikesCount(item._id, newCount);
      } else {
        // Добавляем лайк
        const newCount = likesCount + 1;
        setLocalLikesCount(newCount);
        setLikesCount(item._id, newCount);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error while updating like:', error);
    }
  };

  const handleFollow = async (e) => {
    e.stopPropagation(); // Останавливаем всплытие
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
    e.stopPropagation(); // Останавливаем всплытие
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

  // Обработчик клика по посту - переход на страницу поста
  const handlePostClick = () => {
    if (onClick) {
      onClick(); // Если передан кастомный обработчик
    } else {
      navigate(`/post/${item._id}`); // Стандартный переход на страницу поста
    }
  };

  // Обработчик клика по имени пользователя - переход в профиль
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
            src={item.profile_image || avaImage}
            alt="avatar"
            className={styles.avatar}
            onClick={handleUserClick} // Клик по аватарке ведет в профиль
          />
        </div>
        <div className={styles.userInfo}>
          <span 
            className={styles.userName}
            onClick={handleUserClick} // Клик по имени ведет в профиль
          >
            {item.user_name}
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
          src={item.image || background}
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
          <FaRegComment 
            className="text-gray-500" 
            size={20} 
            onClick={(e) => {
              e.stopPropagation();
              handlePostClick(); // При клике на комментарий тоже открываем пост
            }}
          />
        </div>
        <div className={styles.caption}>
          <span 
            className={styles.bold}
            onClick={handleUserClick}
          >
            {item.user_name}
          </span>: {item.caption}
        </div>
      </div>

      <div className={styles.commentsContainer}>
        <span>{item.last_comment || 'Add a comment...'}</span>
        <span 
          className={styles.commentText}
          onClick={(e) => {
            e.stopPropagation();
            handlePostClick(); // При клике на "View all comments" открываем пост
          }}
        >
          View all comments ({item.comments_count || 0})
        </span>
      </div>
    </li>
  );
};

export default PostItem;
