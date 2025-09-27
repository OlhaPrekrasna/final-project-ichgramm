import Like from '../models/likeModel.js';
import Notification from '../models/notificationModel.js';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';

export const toggleLikePost = async (req, res) => {
  const { postId } = req.params;
  const { _id: userId } = req.user;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const existingLike = await Like.findOne({
      post_id: postId,
      user_id: userId,
    });
    const sender = await User.findById(userId);

    if (existingLike) {
      // Remove like
      await Like.deleteOne({ _id: existingLike._id });

      post.count_of_likes = Math.max(0, post.count_of_likes - 1);
      await post.save();

      return res.status(200).json({ message: 'Like removed' });
    }

    // Add new like
    const like = new Like({ post_id: postId, user_id: userId });
    await like.save();

    post.count_of_likes += 1;
    await post.save();

    // Create notification for post author
    const newNotification = new Notification({
      user_id: post.user_id,
      type: 'Like',
      text_content: `${sender.username} liked your post`,
      sender_id: userId,
      post_id: postId,
    });
    await newNotification.save();

    return res.status(201).json({
      message: `${sender.username} liked your post`,
      like,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error processing like' });
  }
};

export const getPostLikes = async (req, res) => {
  const { postId } = req.params;

  try {
    const likes = await Like.find({ post_id: postId }).populate({
      path: 'user_id',
      select: 'username',
    });

    const formattedLikes = likes.map((like) => ({
      userId: like.user_id._id,
      username: like.user_id.username,
    }));

    return res.status(200).json(formattedLikes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching likes' });
  }
};

export const getUserLikes = async (req, res) => {
  const { id } = req.params;

  try {
    const likes = await Like.find({ user_id: id }).select('post_id');
    const postIds = likes.map((like) => like.post_id);
    return res.status(200).json(postIds);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching user likes' });
  }
};
