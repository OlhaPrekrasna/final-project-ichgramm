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
  count_of_followers: { type: Number, default: 0 },
  count_of_following: { type: Number, default: 0 },
  count_of_posts: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

export default User;
