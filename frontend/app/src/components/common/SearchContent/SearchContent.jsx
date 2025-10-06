import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../redux/slices/userSlice.js';
import Input from '../Input/Input.jsx';
import { useNavigate } from 'react-router-dom';
import s from './SearchContent.module.css';

function SearchContent() {
  const dispatch = useDispatch();
  const [searchPerson, setSearchPerson] = useState('');
  const users = useSelector((state) => state.user.user || []);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const filteredUsers = Array.isArray(users)
    ? users.filter((user) =>
        user.username?.toLowerCase().includes(searchPerson.toLowerCase())
      )
    : [];

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
    setSearchPerson(''); // Очищаем поиск после выбора
  };

  return (
    <div className={s.searchContent}>
      <h3 className={s.title}>{t('searchContent.search')}</h3>
      <div className={s.inputContainer}>
        <Input
          type="text"
          placeholder={t('searchContent.placeholder')}
          value={searchPerson}
          onChange={(value) => setSearchPerson(value)}
          style={{ background: 'var(--color-bg-dark-grey)' }}
        />
      </div>
      <h5 className={s.recentTitle}>{t('searchContent.recent')}</h5>
      <div className={s.usersList}>
        {filteredUsers.length > 0
          ? filteredUsers.map((user) => (
              <div
                key={user._id}
                className={s.userItem}
                onClick={() => handleUserClick(user._id)}
              >
                <img
                  src={user.profile_image}
                  alt={user.username}
                  className={s.userAvatar}
                  onError={(e) => {
                    e.target.src = '/default-avatar.png';
                  }}
                />
                <span className={s.username}>{user.username}</span>
              </div>
            ))
          : searchPerson && (
              <div className={s.noResults}>{t('searchContent.noResults')}</div>
            )}
      </div>
    </div>
  );
}

export default SearchContent;
