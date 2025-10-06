import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: { type: String, required: true },
  username: { type: String, required: true },
  title: { type: String, default: '' },
  created_at: { type: Date, default: Date.now },
});

postSchema.virtual('count_of_likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'post_id',
  count: true
});

postSchema.virtual('count_of_comments', {
  ref: 'Comment', // если будет отдельная модель комментариев
  localField: '_id',
  foreignField: 'post_id',
  count: true
});

postSchema.set('toObject', { virtuals: true });
postSchema.set('toJSON', { virtuals: true });

const Post = mongoose.model('Post', postSchema);

export default Post;


// import mongoose from 'mongoose';

// const postSchema = new mongoose.Schema({
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   content: { type: String, required: true },
//   // profile_photo: { type: String, require: true },
//   // photo_url: { type: String, required: true },
//   username: { type: String, required: true },
//   title: { type: String, default: '' },
//   count_of_likes: { type: Number, default: 0 },
//   count_of_comments: { type: Number, default: 0 },
//   created_at: { type: Date, default: Date.now },
// });

// const Post = mongoose.model('Post', postSchema);
// export default Post;
