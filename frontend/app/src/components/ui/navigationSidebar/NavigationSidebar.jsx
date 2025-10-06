import s from './navigationSidebar.module.css';
import logo from '../../assets/logo-ichgram.svg';
import Menu from '../menu/Menu.jsx';
import ProfileLink from '../../common/ProfileLink/ProfileLink.jsx';

const NavigationSidebar = () => {
  return (
    <div className={s.navigationSidebar}>
      <div className={s.logoContainer}>
        <img src={logo} alt="Ichgram logo" className={s.logo} />
      </div>
      <div className={s.menuContainer}>
        <Menu />
      </div>
      <div className={s.profileContainer}>
        <ProfileLink />
      </div>
    </div>
  );
};

export default NavigationSidebar;
