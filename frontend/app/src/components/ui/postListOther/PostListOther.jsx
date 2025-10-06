import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getOtherUserPosts } from '../../redux/slices/postsSlice.js';
import PostModal from '../imageGallery/PostModal.jsx';
import s from './postsListOther.module.css';

const PostsListOther = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    if (userId) {
      dispatch(getOtherUserPosts(userId));
    }
  }, [dispatch, userId, updateTrigger]);

  const handleImageClick = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const handleUpdatePosts = () => {
    setUpdateTrigger((prev) => prev + 1);
  };

  if (loading) return <div className={s.loading}>Загрузка...</div>;
  if (error) return <div className={s.error}>{error}</div>;

  return (
    <div className={s.container}>
      <div className={s.postList}>
        {posts && posts.length > 0 ? (
          [...posts].reverse().map((post) => (
            <div key={post._id} className={s.postItem}>
              <img
                src={post.image_url}
                alt="post-thumbnail"
                onClick={() => handleImageClick(post)}
                className={s.postImage}
              />
            </div>
          ))
        ) : (
          <div className={s.noPosts}>
            <p>The user has not published any posts yet.</p>
          </div>
        )}
      </div>

      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={closeModal}
          onUpdatePosts={handleUpdatePosts}
        />
      )}
    </div>
  );
};

export default PostsListOther;
