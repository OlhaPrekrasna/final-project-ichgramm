import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../../redux/slices/commentsSlice.js';
import { $api } from '../../../api/Api.jsx';
import s from './PostHomePageModal.module.css';
import noPhoto from '../../../assets/noPhoto.png';
import commbtn from '../../../assets/comment_btn.svg';
import heart from '../../../assets/heart_btn.svg';
import CommentContent from '../commentContent/CommentContent';

const EmojiPicker = ({ onSelectEmoji }) => {
  const [showEmojis, setShowEmojis] = useState(false);

  const emojis = Array.from({ length: 50 }, (_, i) =>
    String.fromCodePoint(0x1f600 + i)
  );

  const toggleEmojiPicker = () => {
    setShowEmojis((prev) => {
      const newState = !prev;
      if (newState) {
        setTimeout(() => {
          setShowEmojis(false);
        }, 6000);
      }
      return newState;
    });
  };

  return (
    <div className={s.emojiDropdown}>
      <button
        type="button"
        className={s.emojiButton}
        onClick={toggleEmojiPicker}
      >
        😊
      </button>
      {showEmojis && (
        <div className={s.emojiList}>
          {emojis.map((emoji, index) => (
            <span
              key={index}
              className={s.emojiItem}
              onClick={() => onSelectEmoji(emoji)}
            >
              {emoji}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const PostHomePageModal = ({ post, onClose }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    if (post) {
      setLikesCount(post.likes_count || 0);
      setCommentsCount(post.comments_count || 0);
    }
  }, [post]);

  const handleAddComment = async () => {
    if (!currentUser || !currentUser._id) {
      setError('User not found');
      return;
    }

    if (!post || !post._id) {
      setError('Post not found');
      return;
    }

    try {
      await dispatch(
        addComment({
          postId: post._id,
          userId: currentUser._id,
          comment_text: newComment.trim(),
        })
      );
      setNewComment('');
      setCommentsCount((prev) => prev + 1);
    } catch (err) {
      setError('Error adding comment');
    }
  };

  const handleLikePost = async () => {
    if (!currentUser || !currentUser._id) {
      setError('User not found');
      return;
    }

    if (!post || !post._id) {
      setError('Post not found');
      return;
    }

    try {
      await $api.post(`/post/${post._id}/like`, { userId: currentUser._id });
      setLikesCount((prev) => prev + 1);
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleSelectEmoji = (emoji) => {
    setNewComment((prev) => prev + emoji);
  };

  if (!post) return null; // защита от undefined

  return (
    <div className={s.modalOverlay} onClick={onClose}>
      <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeButton} onClick={onClose}>
          &times;
        </button>

        <div className={s.modalContent_leftside}>
          <img src={post.image_url || noPhoto} alt="post" />
        </div>

        <div className={s.rightBox}>
          <div className={s.modalContent_rightside}>
            <div className={s.modalContent_rightside_caption}>
              <span className={s.gradient_border}>
                <span className={s.gradient_border_inner}>
                  <img
                    className={s.avaImg}
                    src={post.profile_image || noPhoto}
                    alt="profile"
                  />
                </span>
              </span>
              <p>
                <span className={s.user_name}>{post.user_name}</span>{' '}
                {post.caption}
              </p>
            </div>

            <div className={s.commentsSection}>
              <CommentContent postId={post._id} />
            </div>
          </div>

          <div>
            <div className={s.notifBox}>
              <div className={s.modalContent_rightside_notifications}>
                <span>
                  <img src={commbtn} alt="comments" /> {commentsCount}
                </span>
                <span>
                  <img src={heart} alt="likes" onClick={handleLikePost} />{' '}
                  {likesCount} Likes
                </span>
              </div>
              <div className={s.modalContent_rightside_notifications_date}>
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div className={s.addCommentSection}>
              <EmojiPicker onSelectEmoji={handleSelectEmoji} />
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className={s.commentInput}
              />
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className={s.commentButton}
              >
                Send
              </button>
            </div>

            {error && <p className={s.errorText}>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostHomePageModal;
