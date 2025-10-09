import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: { type: String, required: true },
  username: { type: String, required: true },
  image_file: { type: String, required: true },
  image_url: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

postSchema.virtual('count_of_likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'post_id',
  count: true,
});

postSchema.virtual('count_of_comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post_id',
  count: true,
});

postSchema.set('toObject', { virtuals: true });
postSchema.set('toJSON', { virtuals: true });

const Post = mongoose.model('Post', postSchema);

export default Post;
