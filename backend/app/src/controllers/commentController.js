import Comment from '../models/commentModel.js';
import Post from '../models/postModel.js';

// Create a comment +
export const createComment = async (req, res) => {
  const { postId } = req.params;
  const { comment_text } = req.body;
  const userId = req.user.userId;
  const profileImage = req.user.profile_image;

  try {
    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Create a comment
    const comment = new Comment({
      post_id: postId,
      user_id: userId,
      profile_image: profileImage,
      comment_text,
    });

    await comment.save();

    // Increase the post’s comments counter
    post.comments_count = (post.comments_count || 0) + 1;
    await post.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating comment' });
  }
};

// Get comments for a post +
export const getPostComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post_id: req.params.postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
};

// Delete a comment +
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    await Comment.findByIdAndDelete(commentId);

    const post = await Post.findById(comment.post_id);
    post.comments_count -= 1;
    await post.save();

    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting comment' });
  }
};

// Like and unlike +
export const likeComment = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user.userId;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    const isLiked = comment.likes?.some(
      (id) => id.toString() === userId.toString()
    );

    if (isLiked) {
      comment.likes = comment.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      comment.likes.push(userId);
    }

    await comment.save();

    return res.status(200).json({
      _id: comment._id,
      likes_count: comment.likes.length,
      isLiked: !isLiked,
    });
  } catch (error) {
    console.error('Error in likeComment:', error);
    res.status(500).json({ error: 'Error liking comment' });
  }
};
