import s from './SidebarPart.module.css';
import logo from '../../../assets/logo-ichgram.svg';
import Menu from '../menu/Menu.jsx';
import ProfileLink from '../../common/ProfileLink/ProfileLink.jsx';

const SidebarPart = () => {
  return (
    <div className={s.sidebarPart}>
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

export default SidebarPart;
