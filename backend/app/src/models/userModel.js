import client from '../clients/mongooseClient.js';

const mongoose = client.get();

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  bio: { type: String, default: '' },
  bio_website: { type: String, default: '' },
  profile_photo: { type: String, default: '' },
  profile_key: { type: String, default: '' },
  created_at: { type: Date, default: Date.now },
});

userSchema.virtual('full_name').get(function () {
  return [this.first_name, this.last_name].join(' ').trim();
});

// Виртуальные поля
userSchema.virtual('count_of_posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user_id',
  count: true,
});

userSchema.virtual('count_of_followers', {
  ref: 'Follow',
  localField: '_id',
  foreignField: 'followed_user_id',
  count: true,
});

userSchema.virtual('count_of_following', {
  ref: 'Follow',
  localField: '_id',
  foreignField: 'follower_user_id',
  count: true,
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('User', userSchema);

export default User;
