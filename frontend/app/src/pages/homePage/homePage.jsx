import React from 'react';
import PostHomePage from '../../components/ui/postsHomePage/PostHomePage.jsx';
import s from './HomePage.module.css';
import allUpdates from '../../assets/allUdate.png';

const HomePage = () => {
  return (
    <div className={s.homePage}>
      <PostHomePage />
      <div className={s.allUpdates}></div>
    </div>
  );
};

export default HomePage;
