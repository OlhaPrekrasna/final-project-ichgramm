import React, { useState, useEffect } from 'react';
import { $api } from '../../../api/Api.jsx';
import SearchContent from '../../common/SearchContent/SearchContent.jsx';
import s from './Search.module.css';

const Search = ({ isOpen, onClose }) => {
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

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const performSearch = async (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await $api.get(
          `/users/search?q=${encodeURIComponent(query)}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

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

  if (!isOpen) return null;

  return (
    <>
      <div className={s.overlay} onClick={onClose} />
      <div className={s.searchModal}>
        <SearchContent
          searchQuery={searchQuery}
          searchResults={searchResults}
          recentSearches={recentSearches}
          isLoading={isLoading}
          onUserClick={addToRecentSearches}
          onClearRecent={clearRecentSearches}
          onSearchChange={setSearchQuery}
          onClose={onClose}
        />
      </div>
    </>
  );
};

export default Search;
