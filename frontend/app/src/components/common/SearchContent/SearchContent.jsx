import { Link } from 'react-router-dom';
import s from './SearchContent.module.css';

const SearchContent = ({
  searchQuery = '',
  searchResults = [],
  recentSearches = [],
  isLoading = false,
  onUserClick,
  onClearRecent,
  onSearchChange, // Добавляем пропс для изменения поиска
  onClose, // Добавляем пропс для закрытия
}) => {
  const handleUserClick = (user) => {
    if (onUserClick) {
      onUserClick(user);
    }
  };

  const handleInputChange = (e) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  return (
    <div className={s.searchContent}>
      {/* Заголовок с крестиком */}
      {/* <div className={s.searchHeader}>
        <h3 className={s.searchTitle}>Search</h3>
        <button className={s.closeButton} onClick={onClose}>
          ×
        </button>
      </div> */}

      {/* Инпут для поиска */}
      {/* <div className={s.searchInputContainer}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search users..."
          className={s.searchInput}
          autoFocus
        />
      </div> */}

      {/* Результаты поиска или история */}
      <div className={s.resultsContainer}>
        {searchQuery ? (
          // Показываем результаты поиска
          <>
            {isLoading ? (
              <div className={s.loading}>Searching...</div>
            ) : searchResults.length > 0 ? (
              <div className={s.searchResults}>
                <h3 className={s.sectionTitle}>Search Results</h3>
                {searchResults.map((user) => (
                  <Link
                    key={user._id}
                    to={`/profile/${user._id}`}
                    className={s.searchItem}
                    onClick={() => handleUserClick(user)}
                  >
                    <img
                      src={user.profile_photo || '/default-avatar.png'}
                      alt={user.username}
                      className={s.userAvatar}
                    />
                    <div className={s.userInfo}>
                      <p className={s.username}>{user.username}</p>
                      <p className={s.fullname}>
                        {user.full_name || user.username}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className={s.noResults}>
                <p>No users found for "{searchQuery}"</p>
              </div>
            )}
          </>
        ) : (
          // Показываем последние поиски
          <>
            <div className={s.recentHeader}>
              <h3 className={s.sectionTitle}>Results</h3>
              {recentSearches.length > 0 && (
                <button className={s.clearButton} onClick={onClearRecent}>
                  Clear all
                </button>
              )}
            </div>
            <div className={s.recentSearches}>
              {recentSearches.length > 0 ? (
                recentSearches.map((user) => (
                  <Link
                    key={user._id}
                    to={`/profile/${user._id}`}
                    className={s.searchItem}
                    onClick={() => handleUserClick(user)}
                  >
                    <img
                      src={user.profile_photo || '/default-avatar.png'}
                      alt={user.username}
                      className={s.userAvatar}
                    />
                    <div className={s.userInfo}>
                      <p className={s.username}>{user.username}</p>
                      <p className={s.fullname}>
                        {user.full_name || user.username}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className={s.noSearches}>
                  <p>No search results</p>
                  <p className={s.hint}>Search for users to see them here</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchContent;
