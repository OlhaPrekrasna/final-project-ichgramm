import Input from '../../../common/Input/Input.jsx';
import s from './searchSidebar.module.css';

const SearchSidebar = () => {
  return (
    <div className={s.searchSidebar}>
      <div className={s.searchSidebar_content}>
        <h3 className={s.title}>{t('searchBar.search')}</h3>
        <div className={s.inputContainer}>
          <Input
            placeholder={Search('searchBar.searchPlaceholder')}
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

export default SearchSidebar;
