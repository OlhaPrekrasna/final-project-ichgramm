import User from '../models/userModel.js';
import Post from '../models/postModel.js';

// Поиск пользователей +
export const searchUsers = async (req, res) => {
  const { query } = req.query;

  try {
    const filter = query ? { username: { $regex: query, $options: 'i' } } : {};

    const users = await User.find(filter).select('username bio').limit(10);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при поиске пользователей' });
  }
};

// Поиск постов +
export const searchPosts = async (req, res) => {
  const { query } = req.query;

  try {
    const filter = query
      ? {
          $or: [
            { content: { $regex: query, $options: 'i' } },
            { caption: { $regex: query, $options: 'i' } },
          ],
        }
      : {};

    const posts = await Post.find(filter).populate('user_id', 'username');
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при поиске постов' });
  }
};
