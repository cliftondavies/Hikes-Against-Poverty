import PropTypes from 'prop-types';
import SignUpForm from '../SignUpForm/SignUpForm';
import SignInForm from '../SignInForm/SignInForm';
import BookingForm from '../BookingForm/BookingForm';

const Form = ({ formType, status }) => {
  if (formType === 'Sign Up') { return <SignUpForm active={status} />; }
  if (formType === 'Sign In') { return <SignInForm active={status} />; }
  if (formType === 'Book') { return <BookingForm active={status} />; }
  return null;
};

Form.propTypes = {
  formType: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
};

export default Form;
