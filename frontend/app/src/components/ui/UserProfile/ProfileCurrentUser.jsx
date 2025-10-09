import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button.jsx';
import Follows from '../../ui/follows/Follows.jsx';
// import { logout } from '../../../redux/slices/authSlice.js';
import noPhoto from '../../../assets/noPhoto.png';
import s from './ProfileCurrentUser.module.css';
import web from '../../../assets/web.svg';
import ich from '../../../assets/ich.svg';
import post1 from '../../../assets/ich-post1.png';
import post2 from '../../../assets/ich-post2.png';
import post3 from '../../../assets/ich-post3.png';
import post4 from '../../../assets/ich-post4.png';
import post5 from '../../../assets/ich-post5.png';
import post6 from '../../../assets/ich-post6.png';

import { $api } from '../../../api/Api.jsx';

const CurrentUserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [follow, setFollow] = useState({
    followers: 'Loading...',
    following: 'Loading...',
  });

  const user = useSelector((state) => state.auth.user);
  if (!user) {
    return <div>Loading...</div>;
  }

  // Массив постов с данными
  // const userPosts = [
  //   {
  //     id: 1,
  //     image_url: post1,
  //     content: 'Просет с участием выпускников IT Career Hub',
  //   },
  //   {
  //     id: 2,
  //     image_url: post2,
  //     content: 'Какие бонусы получают наши студенты?',
  //   },
  //   {
  //     id: 3,
  //     image_url: post3,
  //     content: 'Получите инструкцию к поиску работы в Германии',
  //   },
  //   {
  //     id: 4,
  //     image_url: post4,
  //     content: 'Хотите в IT, но думаете, что это сложно?',
  //   },
  //   { id: 5, image_url: post5, content: 'Станьте Data Analyst за 10 месяцев' },
  //   {
  //     id: 6,
  //     image_url: post6,
  //     content: 'Студентка с тремя детьми и большой мечтой',
  //   },
  // ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await $api.get('/posts/user/me');
        setPosts(res.data);
      } catch (error) {
        console.error('Ошибка загрузки постов:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const handleChangeFollow = (newFollow) => {
    setFollow(newFollow);
  };

  // Функция для перехода к посту
  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className={s.profilePage}>
      {/* Верхняя часть профиля */}
      <div className={s.currentUserProfile}>
        <div className={s.avatarContainer}>
          <span className={s.gradient_border}>
            <span className={s.gradient_border_inner}>
              <img
                src={ich}
                alt={user.username || 'user avatar'}
                className={s.avatarImage}
              />
            </span>
          </span>
        </div>

        <div className={s.profileInfo}>
          <div className={s.profileHeader}>
            <h1 className={s.username}>{user.username}</h1>
            <Button
              className={s.editBtn}
              text="Edit profile"
              style={{
                fontWeight: 600,
                color: 'var(--color-text-dark)',
                backgroundColor: 'var(--color-bg-dark-grey)',
                border: '1px solid var(--color-border-grey)',
              }}
              onClick={handleEditProfile}
            />
          </div>

          <div className={s.stats}>
            <div className={s.statItem}>
              <span className={s.statCount}>{posts.length}</span>
              <span className={s.statLabel}>posts</span>
            </div>
            <div className={s.statItem}>
              <span className={s.statCount}>9,993</span>
              <span className={s.statLabel}>followers</span>
            </div>
            <div className={s.statItem}>
              <span className={s.statCount}>59</span>
              <span className={s.statLabel}>following</span>
            </div>
          </div>

          <div className={s.bioSection}>
            <h2 className={s.fullName}>
              {user.first_name} {user.last_name}
            </h2>

            <div className={s.bioContent}>
              <p className={s.bio}>{user.bio}</p>

              {user.bio_website && (
                <a
                  className={s.websiteLink}
                  href={user.bio_website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={web} alt="website" className={s.webIcon} />
                  {user.bio_website}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Разделительная линия */}
      <div className={s.divider}></div>

      {/* Сетка постов */}
      <div className={s.postsGrid}>
        {posts.map((post) => (
          <div
            key={post.id}
            className={s.postItem}
            onClick={() => handlePostClick(post.id)}
          >
            <img
              src={post.image_url}
              alt={post.content}
              className={s.postImage}
            />
            <div className={s.postOverlay}>
              <span className={s.postCaption}>{post.content}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentUserProfile;
