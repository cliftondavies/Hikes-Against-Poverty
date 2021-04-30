import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Toggle.module.scss';

const Toggle = ({ active, clickHandler }) => {
  const location = useLocation();
  let toggleStyle = styles.showToggle;
  const xIconStyle = (active) ? null : styles.hideToggle;
  const menuIconStyle = (active) ? styles.hideToggle : null;
  const closeToggle = (active) ? styles.closeToggle : null;

  if (location.pathname === '/') { toggleStyle = styles.hideToggle; }

  const handleClick = (e) => {
    clickHandler(e.target.textContent);
  };

  return (
    <button type="button" className={`${toggleStyle} ${closeToggle}`} onClick={handleClick}>
      <span className={menuIconStyle}>&#9868;</span>
      <span className={xIconStyle}>X</span>
    </button>
  );
};

Toggle.propTypes = {
  active: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default Toggle;
