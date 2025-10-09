import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import s from './menu.module.css';

import homeIcon from '../../../assets/homeIcon.svg';
import homeIconActive from '../../../assets/home-active.svg';
import searchIcon from '../../../assets/search.svg';
import searchIconActive from '../../../assets/search-active.svg';
import exploreIcon from '../../../assets/explore.svg';
import exploreIconActive from '../../../assets/explore-active.svg';
import messagesIcon from '../../../assets/messages.svg';
import messagesIconActive from '../../../assets/messages-active.svg';
import notificationsIcon from '../../../assets/notifications.svg';
import notificationsIconActive from '../../../assets/notifications-active.svg';
import createIcon from '../../../assets/create.svg';
import createIconActive from '../../../assets/create-active.svg';

import Modal from '../../common/Modal/Modal.jsx';
import SearchContent from '../../common/SearchContent/SearchContent.jsx';
import CreatePostPage from '../../../pages/createNewPostPage/CreateNewPostPage.jsx';
import NotificationsBar from '../notificationsBar/NotificationsBar.jsx';

const Menu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalSize, setModalSize] = useState('default');
  const [activeLink, setActiveLink] = useState('');

  const userId = localStorage.getItem('userId') || 'mockUserId';

  const openModal = (type) => {
    setIsModalOpen(true);

    switch (type) {
      case 'search':
        setModalSize('left');
        setModalContent(<SearchContent />);
        break;
      case 'notifications':
        setModalSize('left');
        setModalContent(<NotificationsBar userId={userId} />);
        break;
      case 'create':
        setModalSize('large');
        setModalContent(<CreatePostPage />);
        break;
      default:
        setModalContent(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className={s.menubar}>
      {/* Home */}
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
      >
        {({ isActive }) => (
          <>
            <img src={isActive ? homeIconActive : homeIcon} alt="Home" />
            <span>Home</span>
          </>
        )}
      </NavLink>

      {/* Search */}
      <NavLink
        to="/search"
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
        onClick={(e) => {
          e.preventDefault();
          openModal('search');
          handleLinkClick('search');
        }}
      >
        <img
          src={activeLink === 'search' ? searchIconActive : searchIcon}
          alt="Search"
        />
        <span>Search</span>
      </NavLink>

      {/* Explore */}
      <NavLink
        to="/explore"
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
      >
        {({ isActive }) => (
          <>
            <img
              src={isActive ? exploreIconActive : exploreIcon}
              alt="Explore"
            />
            <span>Explore</span>
          </>
        )}
      </NavLink>

      {/* Messages */}
      <NavLink
        to="/messages"
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
      >
        {({ isActive }) => (
          <>
            <img
              src={isActive ? messagesIconActive : messagesIcon}
              alt="Messages"
            />
            <span>Messages</span>
          </>
        )}
      </NavLink>

      {/* Notifications */}
      <NavLink
        to="/notifications"
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
        onClick={(e) => {
          e.preventDefault();
          openModal('notifications');
          handleLinkClick('notifications');
        }}
      >
        <img
          src={
            activeLink === 'notifications'
              ? notificationsIconActive
              : notificationsIcon
          }
          alt="Notifications"
        />
        <span>Notifications</span>
      </NavLink>

      {/* Create */}
      <NavLink
        to="/create"
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
        onClick={(e) => {
          e.preventDefault();
          openModal('create');
          handleLinkClick('create');
        }}
      >
        <img
          src={activeLink === 'create' ? createIconActive : createIcon}
          alt="Create"
        />
        <span>Create</span>
      </NavLink>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={modalContent}
        modalSize={modalSize}
      />
    </nav>
  );
};

export default Menu;

// {
/* <div className={st.logoutBox}>
            <button className={st.logoutButton} onClick={handleLogout}>
              <img src={logoutIcon} alt="Logout" className={st.logoutIcon} />
            </button>
          </div> */
// }
