import React from 'react';
import './allPostCard.css';

const AllPostsCard = ({
  image_url,
  caption,
  likes_count,
  comments_count,
  user_name,
  profile_photo,
  created_at,
}) => {
  return (
    <div className="post-card">
      <div className="post-card-header">
        <img
          src={profile_photo}
          alt={`${user_name} profile`}
          className="profile-image"
        />
        <span className="username">{user_name}</span>
      </div>

      <img src={image_url} alt="post" className="post-image" />

      <p className="caption">{caption}</p>

      <div className="post-card-footer">
        <span className="likes">{likes_count} Likes</span>
        <span className="comments">{comments_count} Comments</span>
        <span className="date">
          {new Date(created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default AllPostsCard;
