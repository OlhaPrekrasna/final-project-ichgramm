import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostItem from './PostItem.jsx';
import { $api } from '../../../api/Api.jsx';
import styles from './PostHomePage.module.css';

const PostHomePage = () => {
  const [posts, setPosts] = useState([]);
  const [likesCount, setLikesCount] = useState({});
  const [userLikes, setUserLikes] = useState({});
  const [loading, setLoading] = useState(true);

  const currentUser = useSelector((state) => state.auth.user);
  const { _id: currentUserId } = currentUser || {};

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResponse = await $api.get('/posts');
        const posts = postsResponse.data;
        setPosts(posts);

        const likesObj = {};
        posts.forEach((post) => {
          likesObj[post._id] = post.count_of_likes || 0;
        });
        setLikesCount(likesObj);

        if (currentUserId) {
          const userLikesResp = await $api.get(`/user/${currentUserId}/likes`);
          setUserLikes(userLikesResp.data);
        } else {
          setUserLikes([]);
        }
      } catch (error) {
        console.error('Ошибка загрузки постов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSetLikesCount = (postId, count) => {
    setLikesCount((prev) => ({ ...prev, [postId]: count }));
  };

  if (loading) return <p>Загрузка постов...</p>;
  if (!posts.length) return <p>Нет постов для отображения</p>;

  return (
    <div className={styles.postsGrid}>
      {posts.map((post) => (
        <PostItem
          key={post._id}
          item={post}
          author={post.user_id}
          likesCount={likesCount[post._id] || 0}
          setLikesCount={handleSetLikesCount}
          userLikes={userLikes}
        />
      ))}
    </div>
  );
};

export default PostHomePage;
