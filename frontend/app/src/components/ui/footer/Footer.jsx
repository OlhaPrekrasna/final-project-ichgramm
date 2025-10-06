import React from 'react';
import { Link } from 'react-router-dom';
import s from './Footer.module.css';
import { useSelector } from 'react-redux';
// ADDED logout
import { logout } from '../../../redux/slices/authSlice.js';
import st from '../signInForm/SignInForm.module.css';
import logoutIcon from '../../../assets/logout.svg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//------

const Footer = () => {
  // ADDED logout
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  //------

  return (
    <footer className={s.footer}>
      <div className={s.footer_top}>
        <Link to="/home">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/notifications">Notifications</Link>
        <Link to="/create">Create</Link>
        {!user || !token ? (
          <Link to="/signin">SignIn</Link>
        ) : (
          <div className={st.logoutBox}>
            <button className={st.logoutButton} onClick={handleLogout}>
              <img src={logoutIcon} alt="Logout" className={st.logoutIcon} />
            </button>
          </div>
        )}
      </div>

      <div className={s.footer_bottom}>
        <p>ICHgramm 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
