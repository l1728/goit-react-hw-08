import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';
import style from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={style.welcomeNav}>
      <p className={style.welcome}>Welcome, {user.name}</p>
      <button onClick={() => dispatch(logOut())} className={style.btnLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
