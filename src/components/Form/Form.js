import PropTypes from 'prop-types';
import SignUpForm from '../SignUpForm/SignUpForm';
import SignInForm from '../SignInForm/SignInForm';
import BookingForm from '../BookingForm/BookingForm';

const Form = ({ formType, status, formHandler }) => {
  if (formType === 'Sign Up') { return <SignUpForm active={status} formHandler={formHandler} />; }
  if (formType === 'Sign In') { return <SignInForm active={status} formHandler={formHandler} />; }
  if (formType === 'Book') { return <BookingForm active={status} />; }
  return null;
};

Form.defaultProps = {
  formHandler: false,
};

Form.propTypes = {
  formType: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  formHandler: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
};

export default Form;
