import { useEffect, useState } from 'react';
import { getAllPublicPosts } from '../../redux/slices/postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ExplorePostModal from './ExplorePostModal.jsx';
import s from './ExplorePage.module.css';

const ExplorePage = () => {
  const dispatch = useDispatch();

  const { posts, loading, error } = useSelector((state) =>
    state.posts ? state.posts : {}
  );
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllPublicPosts());
  }, [dispatch]);

  const handleImageClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  if (loading) return <div className={s.loading}>Загрузка...</div>;
  if (error) return <div className={s.error}>{error}</div>;

  return (
    <div className={s.pageContainer}>
      <main className={s.content}>
        {!posts ? (
          <div>Oops, no posts were found!</div>
        ) : (
          <div className={s.gallery}>
            {posts.map((item, index) => (
              <div
                key={item._id}
                className={
                  (Math.floor(index / 3) % 2 === 0 && index % 3 === 4) ||
                  (Math.floor(index / 3) % 2 === 1 && index % 3 === 0)
                    ? `${s.postContainer} ${s.largePost}`
                    : s.postContainer
                }
                onClick={() => handleImageClick(item)}
              >
                <img
                  src={item.image_url}
                  alt={item.caption || 'Post image'}
                  className={s.image}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <ExplorePostModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default ExplorePage;
