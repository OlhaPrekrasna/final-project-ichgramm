import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { $api } from '../../api/Api.jsx';
import { addComment } from '../../redux/slices/commentsSlice.js';
import noPhoto from '../../assets/noPhoto.png';
import styles from './PostPage.module.css';

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        // Fetch post data
        const postResponse = await $api.get(`/posts/${id}`);
        const post = postResponse.data;
        setPost(post);
        setLikesCount(post.count_of_likes || 0);

        // it's a temp solution. TODO redo after refactoring PostModel
        const authorId = post.user_id.id;
        // Get the author's data
        const userResponse = await $api.get(`/user/${authorId}`);
        setAuthor(userResponse.data);

        // Fetch comments
        const commentsResponse = await $api.get(`/comments/${id}/comments`);
        setComments(commentsResponse.data || []);

        // Check if the current user liked this post
        if (currentUser) {
          const userLikesResponse = await $api.get(
            `/user/${currentUser._id}/likes`
          );
          setIsLiked(userLikesResponse.data.includes(id));
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id, currentUser]);

  const handleAuthorProfileClick = () => {
    navigate(`/profile/${post.user_id.id}`);
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !currentUser) return;

    try {
      const response = await dispatch(
        addComment({
          postId: id,
          userId: currentUser._id,
          comment_text: newComment.trim(),
        })
      ).unwrap();

      const newCommentData = {
        _id: response._id,
        user_name: currentUser.username,
        profile_photo: currentUser.profile_photo,
        comment_text: newComment.trim(),
        created_at: new Date().toISOString(),
      };

      setComments((prev) => [...prev, newCommentData]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleLike = async () => {
    if (!currentUser) return;

    try {
      if (isLiked) {
        await $api.post(`/posts/${id}/likes`);
        setLikesCount((prev) => Math.max(0, prev - 1));
      } else {
        await $api.post(`/posts/${id}/likes`);
        setLikesCount((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.errorContainer}>
        <h2>Post not found</h2>
        <button onClick={handleBackClick} className={styles.backButton}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.postPage}>
      <button onClick={handleBackClick} className={styles.backButton}>
        ← Back
      </button>

      <div className={styles.postContainer}>
        <div className={styles.imageSection}>
          <img
            src={post.image_url || noPhoto}
            alt="Post"
            className={styles.postImage}
          />
        </div>

        <div className={styles.infoSection}>
          <div className={styles.postHeader}>
            <a link="#" onClick={handleAuthorProfileClick}>
              <div className={styles.userInfo}>
                <img
                  src={author.profile_photo || noPhoto}
                  alt="User avatar"
                  className={styles.userAvatar}
                />
                <div className={styles.userDetails}>
                  <span className={styles.username}>{author.username}</span>
                  <span className={styles.postDate}>
                    {new Date(post.created_at).toLocaleDateString('en-US')}
                  </span>
                </div>
              </div>
            </a>
            <button className={styles.followButton}>Follow</button>
          </div>

          <div className={styles.postDescription}>
            <p>{post.caption}</p>
          </div>

          <div className={styles.postStats}>
            <div className={styles.statItem}>
              <span className={styles.statCount}>{likesCount}</span>
              <span className={styles.statLabel}>likes</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statCount}>{comments.length}</span>
              <span className={styles.statLabel}>comments</span>
            </div>
          </div>

          <div className={styles.commentsSection}>
            <h3 className={styles.commentsTitle}>Comments</h3>
            <div className={styles.commentsList}>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className={styles.commentItem}>
                    <img
                      src={comment.profile_photo || noPhoto}
                      alt="User avatar"
                      className={styles.commentAvatar}
                    />
                    <div className={styles.commentContent}>
                      <div className={styles.commentHeader}>
                        <span className={styles.commentUsername}>
                          {comment.user_name}
                        </span>
                        <span className={styles.commentDate}>
                          {new Date(comment.created_at).toLocaleDateString(
                            'en-US'
                          )}
                        </span>
                      </div>
                      <p className={styles.commentText}>
                        {comment.comment_text}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.noComments}>No comments yet</p>
              )}
            </div>
          </div>

          <div className={styles.actionsSection}>
            <div className={styles.postActions}>
              <button
                onClick={handleLike}
                className={`${styles.likeButton} ${
                  isLiked ? styles.liked : ''
                }`}
              >
                {isLiked ? '❤️' : '🤍'} Like
              </button>
              <span className={styles.likesCount}>{likesCount} likes</span>
            </div>

            <div className={styles.addCommentForm}>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className={styles.commentInput}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddComment();
                  }
                }}
              />
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className={styles.commentButton}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
