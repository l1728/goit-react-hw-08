import { NavLink } from 'react-router-dom';
import style from './AuthNav.module.css';

const AuthNav = () => {
  return (
    <nav className={style.contAuthNav}>
      <NavLink to="/register" className={style.authNav}>
        Register
      </NavLink>
      <NavLink to="/login" className={style.authNav}>
        Login
      </NavLink>
    </nav>
  );
};

export default AuthNav;
