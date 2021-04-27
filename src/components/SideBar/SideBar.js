import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { signOut } from '../../api/api';
import { logout } from '../../redux/actions';
import styles from './SideBar.module.scss';

const SideBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  let sideBarStyle = styles.showSideBar;
  let hikeLinkStyle;
  let bookingLinkStyle;

  if (location.pathname === '/') { sideBarStyle = styles.hideSideBar; }
  if (location.pathname.includes('/hikes')) { hikeLinkStyle = styles.activePage; }
  if (location.pathname === '/bookings') { bookingLinkStyle = styles.activePage; }

  const handleClick = async () => {
    if (JSON.parse(sessionStorage.getItem('user'))) {
      const storedResponse = JSON.parse(sessionStorage.getItem('user'));
      const { uid, client, accessToken } = storedResponse.authentication;
      const signOutResponse = await signOut({ uid, client, accessToken });

      if (!(signOutResponse instanceof Error)) {
        sessionStorage.clear();
        dispatch(logout());
      }
    }
  };

  return (
    <section className={sideBarStyle}>
      <div>
        <Link to="/hikes" className={styles.logo}>Hikes Against Poverty</Link>

        <nav>
          <Link to="/hikes" className={hikeLinkStyle}>HIKES</Link>
          <Link to="/bookings" className={bookingLinkStyle}>BOOKINGS</Link>
          <button type="button">SHOP</button>
          <button type="button">VIRTUAL TOUR</button>
        </nav>
      </div>

      <div>
        <button type="button" onClick={handleClick}>
          Sign Out
        </button>

        <div>
          <i className="im im-twitter" />
          <i className="im im-instagram" />
          <i className="im im-google-plus" />
          <i className="im im-vimeo" />
          <i className="im im-snapchat" />
        </div>

        <span>© 2021 HAP by Clifton Davies</span>
      </div>
    </section>
  );
};

export default SideBar;
