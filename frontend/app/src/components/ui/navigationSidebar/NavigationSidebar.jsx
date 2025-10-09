import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import s from './navigationSidebar.module.css';
import logo from '../../../assets/logo-ichgram.svg';
import Menu from '../menu/Menu.jsx';
import ProfileLink from '../../common/ProfileLink/ProfileLink.jsx';

const NavigationSidebar = ({ openModal }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className={s.navigationSidebar}>
      <div className={s.logoContainer}>
        <img src={logo} alt="Ichgram logo" className={s.logo} />
      </div>
      <div className={s.menuContainer}>
        <Menu openModal={openModal} />
      </div>
      {!user ? (
        <div className={s.profileContainer}>
          <Link to="/signin">SignIn</Link>
          <Link to="/signup">SignUp</Link>
        </div>
      ) : (
        <div className={s.profileContainer}>
          <ProfileLink />
        </div>
      )}
    </div>
  );
};

export default NavigationSidebar;
