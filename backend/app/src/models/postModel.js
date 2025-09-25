import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  profile_photo: { type: String, require: true },
  photo_url: { type: String, required: true },
  user_name: { type: String, required: true },
  caption: { type: String, default: '' },
  count_of_likes: { type: Number, default: 0 },
  count_of_comments: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
