import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchLikeStatus, toggleLike } from '../redux/slices/likesSlice'; // укажите правильный путь

export const useLikes = (postId) => {
  const dispatch = useDispatch();
  const likeData = useSelector(state => state.likes.likes[postId]);
  const loading = useSelector(state => state.likes.loading);
  const error = useSelector(state => state.likes.error);

  useEffect(() => {
    if (postId && !likeData) {
      dispatch(fetchLikeStatus(postId));
    }
  }, [postId, dispatch, likeData]);

  const handleToggleLike = () => {
    if (postId) {
      dispatch(toggleLike(postId));
    }
  };

  return {
    isLiked: likeData?.isLiked || false,
    likesCount: likeData?.likesCount || 0,
    isLoading: likeData?.isLoading || false,
    error,
    toggleLike: handleToggleLike,
    refetch: () => dispatch(fetchLikeStatus(postId))
  };
};