import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaHeart } from 'react-icons/fa';
import { fetchComments, likeComment } from '../../redux/slices/commentsSlice';
import noPhoto from '../../assets/noPhoto.png';
import s from './CommentContent.module.css';
import parseData from '../../helpers/parseData';

const CommentContent = ({ postId }) => {
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comments.comments);
  const currentUser = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.comments.loading);

  // Загружаем комментарии при изменении postId
  useEffect(() => {
    if (postId) {
      dispatch(fetchComments(postId));
    }
  }, [dispatch, postId]);

  // Обработка лайка комментария
  const handleLikeComment = async (commentId) => {
    if (!currentUser || !currentUser._id) {
      console.error(t('postModal.errorUserNotFound'));
      return;
    }
    try {
      await dispatch(
        likeComment({ commentId, userId: currentUser._id })
      ).unwrap();
      dispatch(fetchComments(postId)); // Обновляем список комментариев
    } catch (err) {
      console.error('Ошибка при лайке комментария:', err);
    }
  };

  // Состояние загрузки
  if (loading) {
    return <p>{t('postModal.loadingComments')}</p>;
  }

  return (
    <div className={s.commentsSection}>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className={s.comment}>
            <img
              src={
                comment.user_id === currentUser?._id
                  ? currentUser.profile_image || noPhoto
                  : comment.profile_image || noPhoto
              }
              alt="comment-avatar"
              className={s.commentAvatar}
            />
            <div className={s.commentContent}>
              <p className={s.commentHeader}>
                <strong>
                  {comment.user_id === currentUser?._id
                    ? currentUser.username
                    : comment.user_name || 'Anonymous'}
                </strong>{' '}
                · {parseData(comment.created_at)}
              </p>
              <p className={s.commentText}>{comment.comment_text}</p>
            </div>

            <div className={s.commentActions}>
              <FaHeart
                className={`${s.likeIcon} ${
                  comment.likes?.includes(currentUser?._id)
                    ? s.liked
                    : s.unliked
                }`}
                onClick={() => handleLikeComment(comment._id)}
              />
              <span className={s.likeCount}>{comment.likes?.length || 0}</span>
            </div>
          </div>
        ))
      ) : (
        <p className={s.noComments}>{t('postModal.noComments')}</p>
      )}
    </div>
  );
};

export default CommentContent;
