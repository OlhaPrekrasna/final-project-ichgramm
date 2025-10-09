import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../common/Button/Button.jsx';
import noPhoto from '../../../assets/noPhoto.png';
import s from './ProfileUser.module.css';
import web from '../../../assets/web.svg';

import { $api } from '../../../api/Api.jsx';

const UserProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [counters, setCounters] = useState({
    count_followers: 0,
    count_following: 0,
  });
  const [posts, setPosts] = useState([]);

  const { userId: reqUserId } = useParams();
  const currentUser = useSelector((state) => state.auth.user);
  const userId = reqUserId ? reqUserId : currentUser.id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await $api.get(`/user/${userId}`);
        const user = res.data;
        setUser(user);
        const { count_of_followers, count_of_following } = user;
        setCounters({
          count_followers: count_of_followers || 0,
          count_following: count_of_following || 0,
        });
      } catch (error) {
        console.error('Error loading user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await $api.get(`/posts/user/${userId}`);
        setPosts(res.data);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    };

    fetchPosts();
  }, [userId]);

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className={s.profilePage}>
      <div className={s.currentUserProfile}>
        <div className={s.avatarContainer}>
          <span className={s.gradient_border}>
            <span className={s.gradient_border_inner}>
              <img
                src={user.profile_photo || noPhoto}
                alt={user.username || 'user avatar'}
                className={s.avatarImage}
              />
            </span>
          </span>
        </div>

        <div className={s.profileInfo}>
          <div className={s.profileHeader}>
            <h1 className={s.username}>{user.username}</h1>
            {userId === currentUser.id && (
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
            )}
          </div>

          <div className={s.stats}>
            <div className={s.statItem}>
              <span className={s.statCount}>{posts.length}</span>
              <span className={s.statLabel}>posts</span>
            </div>
            <div className={s.statItem}>
              <span className={s.statCount}>{counters.count_followers}</span>
              <span className={s.statLabel}>followers</span>
            </div>
            <div className={s.statItem}>
              <span className={s.statCount}>{counters.count_following}</span>
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

      <div className={s.divider}></div>

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

export default UserProfile;
