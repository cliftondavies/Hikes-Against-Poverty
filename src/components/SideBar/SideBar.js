import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signOut } from '../../api/api';
import {
  setLoadingStatus, setError, setHikes, setBookings, logout,
} from '../../redux/actions';
import styles from './SideBar.module.scss';

const SideBar = ({ active }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const toggle = (active) ? styles.toggle : null;
  let sideBarStyle = styles.showSideBar;
  let hikeLinkStyle;
  let bookingLinkStyle;

  if (location.pathname === '/') { sideBarStyle = styles.hideSideBar; }
  if (location.pathname.includes('/hikes')) { hikeLinkStyle = styles.activePage; }
  if (location.pathname === '/bookings') { bookingLinkStyle = styles.activePage; }

  const handleClick = async () => {
    if (JSON.parse(sessionStorage.getItem('user'))) {
      dispatch(setLoadingStatus(true));

      const storedResponse = JSON.parse(sessionStorage.getItem('user'));
      const { uid, client, accessToken } = storedResponse.authentication;
      const signOutResponse = await signOut({ uid, client, accessToken });

      if (!(signOutResponse instanceof Error)) {
        sessionStorage.clear();
        dispatch(setLoadingStatus(false));
        dispatch(logout());
        dispatch(setHikes([]));
        dispatch(setBookings([]));
        dispatch(setError({ error: null }));
      } else {
        dispatch(setError({ error: signOutResponse.message }));
      }
    }
  };

  return (
    <section className={`${sideBarStyle} ${toggle}`}>
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

SideBar.propTypes = {
  active: PropTypes.bool.isRequired,
};

export default SideBar;
