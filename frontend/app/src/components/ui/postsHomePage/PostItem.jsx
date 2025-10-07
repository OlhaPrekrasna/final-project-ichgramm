import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegComment } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Button from '../../common/Button/Button.jsx';
import { $api } from '../../../api/Api.jsx';
import avaImage from '../../../assets/noPhoto.png';
import background from '../../../assets/background.png';
import parseData from '../../../helpers/parseData.jsx';
import styles from './PostItem.module.css';

const PostItem = ({
  item,
  likesCount,
  setLikesCount,
  onClick,
  listFollowing,
  handleAddSomeFollow,
  handleRemoveSomeFollow,
  userLikes,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const { _id } = currentUser || {};
  const userId =
    typeof item.user_id === 'string' ? item.user_id : item.user_id?._id || '';

  const [isFollowing, setIsFollowing] = useState(null);

  if (userId === _id) return null;

  useEffect(() => {
    const fetchLikedStatus = async () => {
      try {
        if (userLikes.includes(item._id)) {
          setIsLiked(true);
        }
      } catch (error) {
        console.error('Error while loading like status:', error);
      }
    };
    fetchLikedStatus();
  }, [item._id, _id]);

  useEffect(() => {
    if (listFollowing && userId) {
      setIsFollowing(listFollowing.includes(userId));
    }
  }, [_id, userId, listFollowing]);

  const handleLike = async () => {
    if (!_id) return;
    try {
      if (isLiked) {
        await $api.delete(`/likes/${item._id}/${_id}`);
        setLikesCount(item._id, likesCount - 1);
      } else {
        await $api.post(`/likes/${item._id}/${_id}`);
        setLikesCount(item._id, likesCount + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error while updating like:', error);
    }
  };

  const handleFollow = async () => {
    if (!_id || !userId) return;
    try {
      const response = await $api.post(`/follow/${_id}/follow/${userId}`);
      if (response.status === 201) {
        setIsFollowing(true);
      }
      handleAddSomeFollow(userId);
    } catch (error) {
      console.error('Error while following:', error);
    }
  };

  const handleUnfollow = async () => {
    if (!_id || !userId) return;
    try {
      const response = await $api.delete(`/follow/${userId}/unfollow/${_id}`);
      if (response.status === 200) {
        setIsFollowing(false);
      }
      handleRemoveSomeFollow(userId);
    } catch (error) {
      console.error('Error while unfollowing:', error);
    }
  };

  const handleClickToFollow = (e) => {
    e.stopPropagation();
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <li className={styles.postItem} onClick={onClick}>
      <div className={styles.header}>
        <div className={styles.avatarContainer}>
          <img
            src={item.profile_image || avaImage}
            alt="avatar"
            className={styles.avatar}
          />
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{item.user_name}</span>
          <span className={styles.greyText}>
            • {parseData(item.created_at)} •
          </span>
          {isFollowing !== null && (
            <Button
              text={isFollowing ? 'Unfollow' : 'Follow'}
              style={{
                fontWeight: 600,
                color: 'var(--color-text-blue)',
                backgroundColor: 'transparent',
              }}
              onClick={handleClickToFollow}
            />
          )}
        </div>
      </div>

      <div className={styles.imgPost}>
        <img
          src={item.image || background}
          alt="Post"
          className={styles.postImage}
        />
      </div>

      <div className={styles.bottomBlock}>
        <div className={styles.actions}>
          <FaHeart
            className={`${styles.likeIcon} ${
              isLiked ? styles.liked : styles.unliked
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
            size={20}
          />
          <span className={styles.likesCount}>{likesCount} likes</span>
          <FaRegComment className="text-gray-500" size={20} />
        </div>
        <span>
          <span className={styles.bold}>{item.user_name}</span>: {item.caption}
        </span>
      </div>

      <div className={styles.commentsContainer}>
        <span>{item.last_comment || 'Add a comment...'}</span>
        <span className={styles.commentText}>
          View all comments ({item.comments_count})
        </span>
      </div>
    </li>
  );
};

export default PostItem;

// import React, { useState, useEffect } from 'react';
// import { FaHeart, FaRegComment } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import Button from '../../common/Button/Button.jsx';
// import { $api } from '../../../api/Api.jsx';
// import avaImage from '../../../assets/noPhoto.png';
// import parseData from '../../../helpers/parseData.jsx';
// import styles from './PostItem.module.css';
// import background from '../../../assets/background.png';

// const PostItem = ({
//   item,
//   likesCount,
//   setLikesCount,
//   onClick,
//   listFollowing,
//   handleAddSomeFollow,
//   handleRemoveSomeFollow,
// }) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const currentUser = useSelector((state) => state.auth.user);
//   const { _id } = currentUser || {};

//   const userId =
//     typeof item.user_id === 'string' ? item.user_id : item.user_id?._id || '';

//   const [isFollowing, setIsFollowing] = useState(null);

//   // if (!currentUser) {
//   // console.error('Current user not found');
//   // return null;
//   // }

//   if (userId === _id) {
//     return null;
//   }

//   useEffect(() => {
//     const fetchLikedStatus = async () => {
//       if (!_id) {
//         return;
//       }

//       try {
//         const response = await $api.get(`/likes/user/${_id}`);
//         const userLikes = response.data;
//         if (userLikes.includes(item._id)) {
//           setIsLiked(true);
//         }
//       } catch (error) {
//         console.error('Error while loading like status:', error);
//       }
//     };

//     fetchLikedStatus();
//   }, [item._id, _id]);

//   useEffect(() => {
//     if (listFollowing && userId) {
//       setIsFollowing(listFollowing.includes(userId));
//     }
//   }, [_id, userId, listFollowing]);

//   const handleLike = async () => {
//     if (!_id) {
//       return;
//     }

//     try {
//       if (isLiked) {
//         await $api.delete(`/likes/${item._id}/${_id}`);
//         setLikesCount(item._id, likesCount - 1);
//       } else {
//         await $api.post(`/likes/${item._id}/${_id}`);
//         setLikesCount(item._id, likesCount + 1);
//       }
//       setIsLiked(!isLiked);
//     } catch (error) {
//       console.error('Error while updating like:', error);
//     }
//   };

//   const handleFollow = async () => {
//     if (!_id || !userId) {
//       console.error('Missing data for follow');
//       return;
//     }

//     try {
//       const response = await $api.post(`/follow/${_id}/follow/${userId}`);
//       if (response.status === 201) {
//         setIsFollowing(true);
//       }
//       handleAddSomeFollow(userId);
//     } catch (error) {
//       console.error('Error while following:', error);
//     }
//   };

//   const handleUnfollow = async () => {
//     if (!_id || !userId) {
//       console.error('Missing data for unfollow');
//       return;
//     }

//     try {
//       const response = await $api.delete(`/follow/${userId}/unfollow/${_id}`);
//       if (response.status === 200) {
//         setIsFollowing(false);
//       }
//       handleRemoveSomeFollow(userId);
//     } catch (error) {
//       console.error('Error while unfollowing:', error);
//     }
//   };

//   const handleClickToFollow = (e) => {
//     e.stopPropagation();
//     if (isFollowing) {
//       handleUnfollow();
//     } else {
//       handleFollow();
//     }
//   };

//   return (
//     <li
//       className={styles.postItem}
//       onClick={onClick}
//       style={{ cursor: 'pointer' }}
//     >
//       <div className={styles.header}>
//         <div className={styles.avatarContainer}>
//           <img
//             src={item.profile_image || avaImage}
//             alt="avatar"
//             className={styles.avatar}
//           />
//         </div>
//         <div className={styles.userInfo}>
//           <span className={styles.userName}>{item.user_name}</span>
//           <span className={styles.greytext}>
//             &#8226; {parseData(item.created_at)} &#8226;
//           </span>
//           {isFollowing !== null && (
//             <Button
//               text={
//                 isFollowing
//                   ? t('otherProfile.unfollow')
//                   : t('otherProfile.follow')
//               }
//               style={{
//                 fontWeight: 600,
//                 color: 'var(--color-text-blue)',
//                 backgroundColor: 'transparent',
//               }}
//               onClick={handleClickToFollow}
//             />
//           )}
//         </div>
//       </div>
//       <div className={styles.imgPost}>
//         <img src={background} alt="Post Image" className={styles.postImage} />
//       </div>
//       <div className={styles.bottomBlock}>
//         <div className={styles.actions}>
//           <FaHeart
//             className={`${styles.likeIcon} ${
//               isLiked ? styles.liked : styles.unliked
//             }`}
//             onClick={(e) => {
//               e.stopPropagation();
//               handleLike();
//             }}
//             size={20}
//           />
//           <span className={styles.likesCount}>{likesCount} likes</span>
//           <FaRegComment className="text-gray-500" size={20} />
//         </div>
//         <span>
//           <span className="font-semibold italic">{item.user_name}</span>:{' '}
//           {item.caption}
//         </span>
//       </div>
//       <div className={styles.commentsContainer}>
//         <span>{item.last_comment || 'Add a comment...'}</span>
//         <span className={styles.commentText}>
//           View all comments ({item.comments_count})
//         </span>
//       </div>
//     </li>
//   );
// };

// export default PostItem;
