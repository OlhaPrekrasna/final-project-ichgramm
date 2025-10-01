import React from 'react';
import HomePagePosts from '../../molecules/homePagePosts/HomePagePosts'; // Компонент для отображения постов
import s from './HomePage.module.css';
import allUpdates from "../../assets/allUdate.png";

const HomePage = () => {
  return (
    <div className={s.homepagepost}>
      <HomePagePosts />
      <div className={s.allUpdates}>
        {/* Можно добавить блок с обновлениями */}
        {/* <img src={allUpdates} alt="All updates" /> */}
        {/* <p className={s.allUpBig}>You've seen all the updates</p>
        <p className={s.allUpSmall}>You have viewed all new publications</p> */}
      </div>
    </div>
  );
};

export default HomePage;
