import React, { useState, useEffect } from 'react';
import { $api } from '../../../api/Api.jsx';
import SearchContent from '../../common/SearchContent/SearchContent.jsx';
import s from './Search.module.css';

const Search = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Загрузка последних поисков
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Закрытие по ESC
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

  // Поиск
  useEffect(() => {
    const performSearch = async (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await $api.get(`/users/search?q=${encodeURIComponent(query)}`);
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
    const newRecent = recentSearches.filter(item => item._id !== user._id);
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
          onSearchChange={setSearchQuery} // Передаем функцию для изменения поиска
          onClose={onClose} // Передаем функцию закрытия
        />
      </div>
    </>
  );
};

export default Search;


// import React, { useState, useEffect } from 'react';
// import { $api } from '../../../api/Api.jsx';
// import Input from '../../common/Input/Input.jsx';
// import s from './Search.module.css';

// const Search = ({ isOpen, onClose }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [recentSearches, setRecentSearches] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // Загрузка последних поисков
//   useEffect(() => {
//     const saved = localStorage.getItem('recentSearches');
//     if (saved) {
//       setRecentSearches(JSON.parse(saved));
//     }
//   }, []);

//   // Закрытие по ESC
//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === 'Escape') {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('keydown', handleEscape);
//       document.body.style.overflow = 'hidden';
//     }

//     return () => {
//       document.removeEventListener('keydown', handleEscape);
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen, onClose]);

//   // Поиск
//   useEffect(() => {
//     const performSearch = async (query) => {
//       if (!query.trim()) {
//         setSearchResults([]);
//         return;
//       }

//       setIsLoading(true);
//       try {
//         const response = await $api.get(`/users/search?q=${encodeURIComponent(query)}`);
//         setSearchResults(response.data);
//       } catch (error) {
//         console.error('Search error:', error);
//         setSearchResults([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const timer = setTimeout(() => {
//       performSearch(searchQuery);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   const addToRecentSearches = (user) => {
//     const newRecent = recentSearches.filter(item => item._id !== user._id);
//     newRecent.unshift(user);
    
//     if (newRecent.length > 5) {
//       newRecent.pop();
//     }
    
//     setRecentSearches(newRecent);
//     localStorage.setItem('recentSearches', JSON.stringify(newRecent));
//   };

//   const clearRecentSearches = () => {
//     setRecentSearches([]);
//     localStorage.removeItem('recentSearches');
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       <div className={s.overlay} onClick={onClose} />
//       <div className={s.searchModal}>
//         <div className={s.searchHeader}>
//           <h3 className={s.searchTitle}>Search</h3>
//           <button className={s.closeButton} onClick={onClose}>
//             ×
//           </button>
//         </div>

//         <div className={s.searchContent}>
//           <div className={s.inputWrapper}>
//             <Input
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search users..."
//               autoFocus
//             />
//           </div>

//           <div className={s.resultsSection}>
//             {searchQuery ? (
//               <>
//                 {isLoading ? (
//                   <div className={s.loading}>Searching...</div>
//                 ) : searchResults.length > 0 ? (
//                   <div className={s.searchResults}>
//                     {searchResults.map((user) => (
//                       <div
//                         key={user._id}
//                         className={s.searchItem}
//                         onClick={() => addToRecentSearches(user)}
//                       >
//                         <img
//                           src={user.profile_photo || '/default-avatar.png'}
//                           alt={user.username}
//                           className={s.userAvatar}
//                         />
//                         <div className={s.userInfo}>
//                           <p className={s.username}>{user.username}</p>
//                           <p className={s.fullname}>{user.full_name || user.username}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className={s.noResults}>No users found</div>
//                 )}
//               </>
//             ) : (
//               <>
//                 <div className={s.recentHeader}>
//                   <h4 className={s.sectionTitle}>Recent</h4>
//                   {recentSearches.length > 0 && (
//                     <button
//                       className={s.clearButton}
//                       onClick={clearRecentSearches}
//                     >
//                       Clear all
//                     </button>
//                   )}
//                 </div>
//                 <div className={s.recentSearches}>
//                   {recentSearches.length > 0 ? (
//                     recentSearches.map((user) => (
//                       <div
//                         key={user._id}
//                         className={s.searchItem}
//                         onClick={() => addToRecentSearches(user)}
//                       >
//                         <img
//                           src={user.profile_photo || '/default-avatar.png'}
//                           alt={user.username}
//                           className={s.userAvatar}
//                         />
//                         <div className={s.userInfo}>
//                           <p className={s.username}>{user.username}</p>
//                           <p className={s.fullname}>{user.full_name || user.username}</p>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className={s.noSearches}>
//                       <p>No recent searches</p>
//                     </div>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Search;
