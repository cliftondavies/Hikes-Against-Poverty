import PropTypes from 'prop-types';
import Button from '../Button/Button';

const ButtonList = ({ buttonType, clickHandler }) => {
  const handleClick = (buttonText) => {
    clickHandler(buttonText);
  };

  const renderButton = (value) => {
    if (buttonType === 'Sign Up') { return <Button buttonText={value} clickHandler={handleClick} active />; }
    if (buttonType === 'Sign In') { return <Button buttonText={value} clickHandler={handleClick} active />; }
    return <Button buttonText={value} clickHandler={handleClick} />;
  };

  return (
    <div>
      {renderButton('Sign Up')}
      {renderButton('Sign In')}
    </div>
  );
};

ButtonList.propTypes = {
  buttonType: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default ButtonList;
