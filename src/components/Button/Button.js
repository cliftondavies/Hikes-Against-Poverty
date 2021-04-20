import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ buttonText, clickHandler, active }) => {
  const buttonClass = (active) ? styles.active : styles.inactive;

  const handleClick = (e) => {
    clickHandler(e.target.textContent);
  };

  return (
    <button type="button" onClick={handleClick} className={buttonClass}>
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
