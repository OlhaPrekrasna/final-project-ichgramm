import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button.jsx';
import Follows from '../../ui/follows/Follows.jsx';
// import { logout } from '../../../redux/slices/authSlice.js';
import noPhoto from '../../../assets/noPhoto.png';
import s from './ProfileCurrentUser.module.css';
import web from '../../../assets/web.svg';
import ich from '../../../assets/ich.svg';

const CurrentUserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [follow, setFollow] = useState({
    followers: 'Loading...',
    following: 'Loading...',
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigate('/');
  // };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const handleChangeFollow = (newFollow) => {
    setFollow(newFollow);
  };

  return (
    <div className={s.currentUserProfile}>
      <div className={s.avatarContainer}>
        <span className={s.gradient_border}>
          <span className={s.gradient_border_inner}>
            <img
              src={ich} // Используем импортированную иконку ich
              alt={user.username || 'user avatar'}
              className={s.avatarImage}
            />
          </span>
        </span>
      </div>

      <div className={s.profileInfo}>
        <div className={s.profileHeader}>
          <h1 className={s.username}>itcareerhub</h1>
          <Button
            className={s.editBtn}
            text="Edit profile"
            style={{
              fontWeight: 600,
              color: 'var(--color-text-dark)',
              backgroundColor: 'var(--color-bg-dark-grey)',
              border: '1px solid var(--color-border-grey)',
            }}
            onClick={handleEditProfile}
          />
          {/* <Button
            className={s.btn}
            text="Log out"
            style={{
              fontWeight: 600,
            }}
            onClick={handleLogout}
          /> */}
        </div>

        <div className={s.stats}>
          <div className={s.statItem}>
            <span className={s.statCount}>129</span>
            <span className={s.statLabel}>posts</span>
          </div>
          <div className={s.statItem}>
            <span className={s.statCount}>9,993</span>
            <span className={s.statLabel}>followers</span>
          </div>
          <div className={s.statItem}>
            <span className={s.statCount}>59</span>
            <span className={s.statLabel}>following</span>
          </div>
        </div>

        <div className={s.bioSection}>
          <h2 className={s.fullName}>IT Career Hub</h2>
          
          <div className={s.bioContent}>
            <p className={s.bio}>
              • Гарантия помощи с трудоустройством в ведущие IT-компании<br />
              • Выпускники зарабатывают от 45к евро<br />
              • БЕСПЛАТНАЯ...more
            </p>
            
            <a
              className={s.websiteLink}
              href="https://bit.ly/3rpiIbh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={web} alt="website" className={s.webIcon} />
              bit.ly/3rpiIbh
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentUserProfile;

// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// import Button from '../../common/Button/Button.jsx';
// import Follows from '../../ui/follows/Follows.jsx';
// // import { logout } from '../../../redux/slices/authSlice.js';
// import noPhoto from '../../../assets/noPhoto.png';
// import s from './ProfileCurrentUser.module.css';
// import web from '../../../assets/web.svg';
// import ich from '../../../assets/ich.svg';


// const CurrentUserProfile = () => {
//   const user = useSelector((state) => state.auth.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [follow, setFollow] = useState({
//     followers: 'Loading...',
//     following: 'Loading...',
//   });

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   // const handleLogout = () => {
//   //   dispatch(logout());
//   //   navigate('/');
//   // };

//   const handleEditProfile = () => {
//     navigate('/profile/edit');
//   };

//   const handleChangeFollow = (newFollow) => {
//     setFollow(newFollow);
//   };

//   return (
//     <div className={s.currentUserProfile}>
//       <div className={s.avatarContainer}>
//         <span className={s.gradient_border}>
//           <span className={s.gradient_border_inner}>
//             <img
//               src={user.profile_image || 'ich'}
//               alt={user.username || 'user avatar'}
//               className={s.avatarImage}
//             />
//           </span>
//         </span>
//       </div>

//       <div className={s.profileInfo}>
//         <div className={s.profileHeader}>
//           <h1 className={s.username}>{user.username}</h1>
//           <Button
//             className={s.editBtn}
//             text="Edit profile"
//             style={{
//               fontWeight: 600,
//               color: 'var(--color-text-dark)',
//               backgroundColor: 'var(--color-bg-dark-grey)',
//               border: '1px solid var(--color-border-grey)',
//             }}
//             onClick={handleEditProfile}
//           />
//           {/* <Button
//             className={s.btn}
//             text="Log out"
//             style={{
//               fontWeight: 600,
//             }}
//             onClick={handleLogout}
//           /> */}
//         </div>

//         <div className={s.stats}>
//           <div className={s.statItem}>
//             <span className={s.statCount}>{user.posts_count || 0}</span>
//             <span className={s.statLabel}>posts</span>
//           </div>
//           <div className={s.statItem}>
//             <span className={s.statCount}>9,993</span>
//             <span className={s.statLabel}>followers</span>
//           </div>
//           <div className={s.statItem}>
//             <span className={s.statCount}>59</span>
//             <span className={s.statLabel}>following</span>
//           </div>
//         </div>

//         <div className={s.bioSection}>
//           <h2 className={s.fullName}>{user.full_name || user.username}</h2>
          
//           {user.bio && (
//             <p className={s.bio}>• Гарантия помощи с трудоустройством в ведущие IT-компании
// • Выпускники зарабатывают от 45к евро
// БЕСПЛАТНАЯ
// ... more
// {user.bio}</p>
//           )}

//           {user.bio_website && (
//             <a
//               className={s.websiteLink}
//               href={
//                 user.bio_website.startsWith('http')
//                   ? user.bio_website
//                   : `https://${user.bio_website}bit.ly/3rpiIbh`
//               }
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <img src={web} alt="website" className={s.webIcon} />
//               {user.bio_website}
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CurrentUserProfile;



// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// import Button from '../../common/Button/Button.jsx';
// import Follows from '../../ui/follows/Follows.jsx';
// // import { logout } from '../../../redux/slices/authSlice.js';
// import noPhoto from '../../../assets/noPhoto.png';
// import s from './ProfileCurrentUser.module.css';
// import web from '../../../assets/web.svg';

// const CurrentUserProfile = () => {
//   const user = useSelector((state) => state.auth.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [follow, setFollow] = useState({
//     followers: 'Loading...',
//     following: 'Loading...',
//   });

//   if (!user) {
//     return <div>currentUserProfile.error</div>;
//   }

//   // const handleLogout = () => {
//   //   dispatch(logout());
//   //   navigate('/');
//   // };

//   const handleEditProfile = () => {
//     navigate('/profile/edit');
//   };

//   const handleChangeFollow = (newFollow) => {
//     setFollow(newFollow);
//   };

//   return (
//     <div className={s.currentUserProfile}>
//       <span className={s.gradient_border}>
//         <span className={s.gradient_border_inner}>
//           <img
//             src={user.profile_image || noPhoto}
//             alt={user.username || 'user avatar'}
//           />
//         </span>
//       </span>

//       <div className={s.currentUserProfile_rightside}>
//         <div className={s.currentUserProfile_rightside_btnBox}>
//           <p>{user.username}</p>
//           <Button
//             className={s.btn}
//             text="Edit profile"
//             style={{
//               fontWeight: 600,
//               color: 'var(--color-text-dark)',
//               width: '168.72px',
//               backgroundColor: 'var(--color-bg-dark-grey)',
//             }}
//             onClick={handleEditProfile}
//           />
//           {/* <Button
//             className={s.btn}
//             text="currentUserProfile.btnLogOut"
//             style={{
//               width: '168.72px',
//               fontWeight: 600,
//             }}
//             onClick={handleLogout}
//           /> */}
//         </div>

//         <div className={s.currentUserProfile_statistic}>
//           <p>
//             <span className={s.currentUserProfile_statisticCount}>
//               {user.posts_count || 0}
//             </span>{' '}
//             'currentUserProfile.posts'
//           </p>

//           {/* <Follows
//             userId={user._id}
//             follow={follow}
//             setFollow={handleChangeFollow}
//           /> */}
//         </div>

//         {user.bio && (
//           <p className={s.currentUserProfile_statisticBio}>{user.bio}</p>
//         )}

//         {user.bio_website && (
//           <a
//             className={s.webLink}
//             href={
//               user.bio_website.startsWith('http')
//                 ? user.bio_website
//                 : `https://${user.bio_website}`
//             }
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <img src={web} alt="website" />
//             {user.bio_website}
//           </a>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CurrentUserProfile;
