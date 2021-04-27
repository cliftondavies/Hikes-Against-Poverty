import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ buttonText, clickHandler, active }) => {
  let buttonClass;
  if (!active) { buttonClass = styles.inactive; }
  if (active) { buttonClass = styles.active; }
  if (buttonText === 'Book A Hike') { buttonClass = styles.bookingBtn; }

  const handleClick = (e) => {
    clickHandler(e.target.textContent);
  };

  return (
    <button type="button" onClick={handleClick} className={`${styles.btn} ${buttonClass}`}>
      {buttonText}
    </button>
  );
};

Button.defaultProps = {
  active: false,
};

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  active: PropTypes.bool,
};

export default Button;
