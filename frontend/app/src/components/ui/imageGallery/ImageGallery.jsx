import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../../redux/slices/postsSlice.js';
import PostModal from './PostModal';
import s from './ImageGallery.module.css';

const ImageGallery = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const handleImageClick = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const handleUpdatePosts = () => {
    dispatch(getAllPosts());
  };

  if (loading) return <div className={s.loading}>Загрузка...</div>;
  if (error) return <div className={s.error}>{error}</div>;

  return (
    <div className={s.galleryContainer}>
      <div className={s.postList}>
        {posts
          ?.slice()
          .reverse()
          .map((post) => (
            <img
              key={post._id}
              src={post.image_url}
              alt="post-thumbnail"
              onClick={() => handleImageClick(post)}
              className={s.postImage}
            />
          ))}
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

export default ImageGallery;
