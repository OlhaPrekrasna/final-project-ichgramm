import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostsListOther from '../../components/ui/postListOther/PostListOther.jsx';
import s from './AnotherProfilePage.module.css';
import axios from 'axios';

const AnotherProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3001/api/v1/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        setError('Error loading profile');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (loading) return <div className={s.loading}>Loading profile...</div>;
  if (error) return <div className={s.error}>{error}</div>;
  if (!user) return <div className={s.error}>User not found</div>;

  return (
    <div className={s.anotherProfilePage}>
      <div className={s.userInfo}>
        <img src={user.avatarUrl} alt={`${user.first_name} avatar`} className={s.avatar} />
        <h2>{user.first_name} {user.last_name}</h2>
        <p>{user.bio || 'No information about the user'}</p>
      </div>

      <PostsListOther />
    </div>
  );
};

export default AnotherProfilePage;
