import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { $api } from '../../api/Api.jsx';
import SearchContent from '../../components/common/SearchContent/SearchContent.jsx';
import s from './SearchPage.module.css';

const SearchPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await $api.get(
        `search/users?query=${encodeURIComponent(query)}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const addToRecentSearches = (user) => {
    const newRecent = recentSearches.filter((item) => item._id !== user._id);
    newRecent.unshift(user);

    if (newRecent.length > 5) {
      newRecent.pop();
    }

    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className={s.searchPage}>
      <div className={s.searchContainer}>
        <h1 className={s.pageTitle}>Search</h1>

        <div className={s.searchInputContainer}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className={s.searchInput}
          />
        </div>

        <SearchContent
          searchQuery={searchQuery}
          searchResults={searchResults}
          recentSearches={recentSearches}
          isLoading={isLoading}
          onUserClick={addToRecentSearches}
          onClearRecent={clearRecentSearches}
        />
      </div>
    </div>
  );
};

export default SearchPage;
