import React from 'react';
import PostHomePage from '../../components/ui/postsHomePage/PostHomePage.jsx';
import s from './HomePage.module.css';
import allUpdates from '../../assets/allUdate.png';

const HomePage = () => {
  return (
    <div className={s.homePage}>
      <PostHomePage />
      <div className={s.allUpdates}>
        {/* <img src={allUpdates} alt="All updates" /> */}
        {/* <p className={s.allUpdatesBig}>You've seen all the updates</p>
        <p className={s.allUpdatesSmall}>You have viewed all new publications</p> */}
      </div>
    </div>
  );
};

export default HomePage;
