import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import getUserIdFromToken from '../utils/tokenDecoded.js';

// Получение всех постов пользователя +
export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user_id: getUserIdFromToken(req) });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving posts' });
  }
};

// create Post +
export const createPost = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'No content were provided!' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded!' });
    }
    const { location: imageUrl, key: imageFile } = req.file;

    const post = new Post({
      user_id: currentUser.userId,
      username: currentUser.username,
      content,
      image_url: imageUrl,
      image_file: imageFile,
      created_at: new Date(),
    });
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating post' });
  }
};

// Удаление поста +
export const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const { userId } = req.user;
    if (userId !== post.user_id) {
      return res.status(403).json({ error: 'Not authorised!' });
    }

    await Post.findByIdAndDelete(postId);

    const user = await User.findById(post.user_id);
    user.posts_count -= 1;
    await user.save();

    res.status(200).json({ message: 'The post has been deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post' });
  }
};

// Получение поста по ID +
export const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId)
      .populate('user_id', 'username')
      .populate('count_of_likes');
    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error receiving post' });
  }
};

// update post +
export const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const { userId } = req.user;
    if (userId !== post.user_id) {
      return res.status(403).json({ error: 'Not authorised!' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: { title, content } },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating post' });
  }
};

// Получение всех постов +
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate('user_id', 'username profile_photo')
      .populate('count_of_likes');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving all posts' });
  }
};

// Посты другого пользователя +
export const getOtherUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ user_id: userId });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving posts' });
  }
};

// Посты пользователей, на которых подписан текущий
// export const getFollowingPosts = async (req, res) => {
//   try {
//     const userId = getUserIdFromToken(req);

//     const user = await User.findById(userId).populate('following', '_id');
//     const followingIds = user.following.map((followedUser) => followedUser._id);

//     const posts = await Post.find({ user_id: { $in: followingIds } })
//       .populate('id', 'username profile_photo')
//       .sort({ created_at: -1 });

//     res.status(200).json(posts);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: 'Error retrieving posts from subscribed users' });
//   }
// };
