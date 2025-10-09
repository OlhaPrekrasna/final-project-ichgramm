import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../../redux/slices/commentsSlice.js';
import { $api } from '../../../api/Api.jsx';
import s from './PostHomePageModal.module.css';
import noPhoto from '../../../assets/noPhoto.png';
import commbtn from '../../../assets/comment_btn.svg';
import heart from '../../../assets/heart_btn.svg';
import placeCreate from '../../../assets/place-create.svg';
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

const CreatePostModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState('');
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const currentUser = useSelector((state) => state.auth.user);

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFilePath(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setUploadStatus('Please select an image first');
      return;
    }

    if (!currentUser) {
      setUploadStatus('User not authenticated');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Creating post...');

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('caption', caption);
      formData.append('user_id', currentUser._id);
      formData.append('user_name', currentUser.username);

      const response = await $api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setUploadStatus('Post created successfully!');
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setUploadStatus('Failed to create post. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange({ target: { files } });
    }
  };

  return (
    <div className={s.createPostModal} onClick={(e) => e.stopPropagation()}>
      {/* Header */}
      <div className={s.modalHeader}>
        <button type="button" className={s.backButton} onClick={onClose}>
          ←
        </button>
        <h2 className={s.modalTitle}>Create new post</h2>
        <button
          type="submit"
          form="postForm"
          className={s.shareButton}
          disabled={isUploading || !file}
        >
          {isUploading ? 'Sharing...' : 'Share'}
        </button>
      </div>

      <div className={s.modalContent}>
        {!file ? (
          <div
            className={s.uploadArea}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className={s.uploadContent}>
              <img src={placeCreate} alt="Upload" className={s.uploadIcon} />
              <p className={s.uploadText}>Drag photos and videos here</p>
              <label htmlFor="fileInput" className={s.fileInputLabel}>
                Select from computer
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className={s.fileInput}
                onChange={handleFileChange}
              />
            </div>
          </div>
        ) : (
          <div className={s.editArea}>
            <div className={s.imagePreview}>
              <img src={filePath} alt="Preview" className={s.previewImage} />
            </div>

            <div className={s.captionSection}>
              <div className={s.userInfo}>
                <img
                  src={currentUser?.profile_photo || noPhoto}
                  alt={currentUser?.username}
                  className={s.userAvatar}
                />
                <span className={s.username}>{currentUser?.username}</span>
              </div>

              <textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className={s.captionInput}
                rows="4"
                maxLength="2200"
              />

              <div className={s.captionInfo}>
                <span className={s.charCount}>{caption.length}/2,200</span>
              </div>
            </div>
          </div>
        )}

        {uploadStatus && (
          <div
            className={`${s.statusMessage} ${
              uploadStatus.includes('successfully') ? s.success : s.error
            }`}
          >
            {uploadStatus}
          </div>
        )}
      </div>

      <form id="postForm" onSubmit={handleSubmit} className={s.hiddenForm} />
    </div>
  );
};

const PostHomePageModal = ({ post, onClose, mode = 'view' }) => {
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
      await $api.post(`/posts/${post._id}/like`, { userId: currentUser._id });
      setLikesCount((prev) => prev + 1);
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleSelectEmoji = (emoji) => {
    setNewComment((prev) => prev + emoji);
  };

  if (mode === 'create') {
    return (
      <div className={s.modalOverlay} onClick={onClose}>
        <CreatePostModal onClose={onClose} />
      </div>
    );
  }

  if (!post) return null;

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
                    src={post.profile_photo || noPhoto}
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
