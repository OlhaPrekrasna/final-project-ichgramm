import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    created_at: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Виртуальное поле для получения информации о пользователе
likeSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id',
  justOne: true,
});

// Виртуальное поле для получения информации о посте
likeSchema.virtual('post', {
  ref: 'Post',
  localField: 'post_id',
  foreignField: '_id',
  justOne: true,
});

const Like = mongoose.model('Like', likeSchema);

export default Like;

