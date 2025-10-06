import React from 'react';
import Input from '../../common/Input/Input.jsx';
import s from './Search.module.css';

const Search = () => {
  return (
    <div className={s.search}>
      <div className={s.searchContainer}>
        <h3 className={s.searchTitle}>{t('searchBar.search')}</h3>
        <div className={s.inputWrapper}>
          <Input
            placeholder={t('searchBar.searchPlaceholder')}
            style={{
              background: 'var(--color-bg-dark-grey)',
              width: '100%',
            }}
          />
        </div>
        <h5 className={s.recentTitle}>{t('searchBar.resent')}</h5>
        <div className={s.recentSearches}>
          <p className={s.noSearches}>No recent searches</p>
        </div>
      </div>
    </div>
  );
};

export default Search;
