import Follow from '../models/followModel.js';
import Notification from '../models/notificationModel.js';
import User from '../models/userModel.js';

// Get list of followers
export const getUserFollowers = async (req, res) => {
  try {
    const followers = await Follow.find({
      followed_user_id: req.params.userId,
    }).populate('follower_user_id', 'username');
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching followers' });
  }
};

// Get list of followings
export const getUserFollowing = async (req, res) => {
  try {
    const following = await Follow.find({
      follower_user_id: req.params.userId,
    }).populate('followed_user_id', 'username');
    res.status(200).json(following);
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching followings' });
  }
};

// Follow a user
export const followUser = async (req, res) => {
  const { userId, targetUserId } = req.params;

  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingFollow = await Follow.findOne({
      follower_user_id: userId,
      followed_user_id: targetUserId,
    });

    if (existingFollow) {
      return res
        .status(400)
        .json({ error: 'You are already following this user' });
    }

    const follow = new Follow({
      follower_user_id: userId,
      followed_user_id: targetUserId,
    });

    user.following_count += 1;
    targetUser.followers_count += 1;

    await user.save();
    await targetUser.save();
    await follow.save();

    const notification = new Notification({
      user_id: targetUser._id,
      type: 'Follow',
      text_content: `${user.username} started following you.`,
      sender_id: userId,
    });

    await notification.save();

    res.status(201).json(follow);
  } catch (error) {
    res.status(500).json({ error: 'Error while following the user' });
  }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
  const { userId, targetUserId } = req.params;

  try {
    const follow = await Follow.findOne({
      follower_user_id: userId,
      followed_user_id: targetUserId,
    });

    if (!follow) {
      return res.status(404).json({ error: 'You are not following this user' });
    }

    await Follow.findByIdAndDelete(follow._id);

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    user.following_count -= 1;
    targetUser.followers_count -= 1;

    await user.save();
    await targetUser.save();

    const notification = new Notification({
      user_id: targetUser._id,
      type: 'Unfollow',
      text_content: `${user.username} stopped following you.`,
      sender_id: userId,
    });

    await notification.save();

    res.status(200).json({ message: 'You have unfollowed the user' });
  } catch (error) {
    res.status(500).json({ error: 'Error while unfollowing the user' });
  }
};
