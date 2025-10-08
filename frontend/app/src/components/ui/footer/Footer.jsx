import { Link } from 'react-router-dom';
import s from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.footer_top}>
        <Link to="/home">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/notifications">Notifications</Link>
        <Link to="/create">Create</Link>
      </div>

      <div className={s.footer_bottom}>
        <p>ICHgramm 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
