import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../../common/Modal/Modal.jsx';
import SearchContent from '../searchContent/SearchSidebar.jsx';
import NotificationsContent from '../notificationsContent/NotificationsContent.jsx';
import s from './HomeSidebar.module.css';
import logo from '../../../assets/logo-ichgram.svg';

import homeL from '../../../assets/homeIcon.svg';
import searchL from '../../../assets/search.svg';
import exploreL from '../../../assets/explore.svg';
import createL from '../../../assets/create.svg';
import messegeL from '../../../assets/messages.svg';
import notifL from '../../../assets/notifications.svg';

import homeD from '../../../assets/home-active.svg';
import searchD from '../../../assets/search-active.svg';
import exploreD from '../../../assets/explore-active.svg';
import createD from '../../../assets/create-active.svg';
import messegeD from '../../../assets/messages-active.svg';
import notifD from '../../../assets/notifications-active.svg';

const HomeSidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [activeLink, setActiveLink] = useState('');
  const [modalSize, setModalSize] = useState('default');

  const openModal = (type) => {
    setIsModalOpen(true);
    switch (type) {
      case 'search':
        setModalSize('left');
        setModalContent(<SearchContent />);
        break;
      case 'notifications':
        setModalSize('left');
        setModalContent(<NotificationsContent />);
        break;
      case 'create':
        setModalSize('large');
        setModalContent(<div>Create Content Component</div>);
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

  const handleModalLinkClick = (type) => {
    openModal(type);
    handleLinkClick(type);
  };

  return (
    <div className={s.homeSidebar}>
      <Link to="/homePage" className={s.logoLink}>
        <img className={s.sidebarLogo} src={logo} alt="Ichgram Logo" />
      </Link>

      <nav className={s.sidebarNav}>
        {/* <Link
          to="/homePage"
          onClick={() => handleLinkClick('home')}
          className={`${s.navLink} ${
            activeLink === 'home' ? s.activeLink : ''
          }`}
        >
          <img
            src={activeLink === 'home' ? homeD : homeL}
            alt="Home"
            className={s.navIcon}
          />
          <span className={s.navText}>Home</span>
        </Link> */}

        <button
          onClick={() => handleModalLinkClick('search')}
          className={`${s.navLink} ${s.navButton} ${
            activeLink === 'search' ? s.activeLink : ''
          }`}
        >
          <img
            src={activeLink === 'search' ? searchD : searchL}
            alt="Search"
            className={s.navIcon}
          />
          <span className={s.navText}>Search</span>
        </button>

        <Link
          to="/explore"
          onClick={() => handleLinkClick('explore')}
          className={`${s.navLink} ${
            activeLink === 'explore' ? s.activeLink : ''
          }`}
        >
          <img
            src={activeLink === 'explore' ? exploreD : exploreL}
            alt="Explore"
            className={s.navIcon}
          />
          <span className={s.navText}>Explore</span>
        </Link>

        <Link
          to="/messages"
          onClick={() => handleLinkClick('messages')}
          className={`${s.navLink} ${
            activeLink === 'messages' ? s.activeLink : ''
          }`}
        >
          <img
            src={activeLink === 'messages' ? messegeD : messegeL}
            alt="Messages"
            className={s.navIcon}
          />
          <span className={s.navText}>Messages</span>
        </Link>

        <button
          onClick={() => handleModalLinkClick('notifications')}
          className={`${s.navLink} ${s.navButton} ${
            activeLink === 'notifications' ? s.activeLink : ''
          }`}
        >
          <img
            src={activeLink === 'notifications' ? notifD : notifL}
            alt="Notifications"
            className={s.navIcon}
          />
          <span className={s.navText}>Notifications</span>
        </button>

        <button
          onClick={() => handleModalLinkClick('create')}
          className={`${s.navLink} ${s.navButton} ${
            activeLink === 'create' ? s.activeLink : ''
          }`}
        >
          <img
            src={activeLink === 'create' ? createD : createL}
            alt="Create"
            className={s.navIcon}
          />
          <span className={s.navText}>Create</span>
        </button>
      </nav>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={modalContent}
        modalSize={modalSize}
      />
    </div>
  );
};

export default HomeSidebar;
