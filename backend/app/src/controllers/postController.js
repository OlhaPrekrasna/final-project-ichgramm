// import multer from 'multer';

import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import getUserIdFromToken from '../utils/tokenDecoded.js';

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// Настройка клиента S3
// const s3Client = new S3Client({
//   region: process.env.AWS_REGION,           // например: "us-east-1"
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,     // ключ пользователя
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // секрет
//   },
// });

// Утилита для загрузки файла в S3
// const uploadToS3 = async (file) => {
//   const fileName = `${Date.now()}-${file.originalname}`; // уникальное имя файла
//   const bucketName = process.env.AWS_BUCKET_NAME;        // имя бакета

//   const params = {
//     Bucket: bucketName,       // бакет
//     Key: fileName,            // имя файла
//     Body: file.buffer,        // содержимое (буфер из multer)
//     ContentType: file.mimetype, // MIME-тип (image/jpeg, image/png и т.д.)
//   };

//   await s3Client.send(new PutObjectCommand(params));

// URL файла (если бакет публичный)
//   return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
// };

// Получение всех постов пользователя
export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user_id: getUserIdFromToken(req) });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving posts' });
  }
};

// Создание нового поста
export const createPost = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { caption } = req.params;

  try {
    // if (!req.file) return res.status(400).json({ error: 'Image not provided' });

    // Загружаем файл в AWS S3
    // const image_url = await uploadToS3(req.file);

    // Находим пользователя
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Создаем новый пост
    const post = new Post({
      user_id: userId,
      // image_url,
      user_name: user.username,
      // profile_image: user.profile_image,
      caption,
      created_at: new Date(),
    });

    await post.save();

    user.posts_count += 1;
    await user.save();

    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error creating post' });
  }
};

// Удаление поста
export const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    await Post.findByIdAndDelete(postId);

    const user = await User.findById(post.user_id);
    user.posts_count -= 1;
    await user.save();

    res.status(200).json({ message: 'The post has been deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post' });
  }
};

// Получение поста по ID
export const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate('user_id', 'username');
    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error receiving post' });
  }
};

// Обновление поста
export const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { caption } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Обновляем caption
    if (caption !== undefined) {
      post.caption = caption;
    }

    // Обновляем картинку
    if (req.file) {
      const image_url = await uploadToS3(req.file);
      post.image_url = image_url;
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error updating post' });
  }
};

// Получение всех постов
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate(
      'user_id',
      'username profile_image'
    );
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving all posts' });
  }
};

// Посты другого пользователя
export const getOtherUserPosts = async (req, res) => {
  try {
    const { user_id } = req.params;
    const posts = await Post.find({ user_id: user_id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving posts' });
  }
};

// Посты пользователей, на которых подписан текущий
export const getFollowingPosts = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);

    const user = await User.findById(userId).populate('following', '_id');
    const followingIds = user.following.map((followedUser) => followedUser._id);

    const posts = await Post.find({ user_id: { $in: followingIds } })
      .populate('user_id', 'username profile_image')
      .sort({ created_at: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error retrieving posts from subscribed users' });
  }
};
