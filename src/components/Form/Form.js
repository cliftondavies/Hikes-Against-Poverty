import PropTypes from 'prop-types';
import SignUpForm from '../SignUpForm/SignUpForm';
import SignInForm from '../SignInForm/SignInForm';
import BookingForm from '../BookingForm/BookingForm';
import styles from './Form.module.scss';

const Form = ({ formType, status }) => {
  if (formType === 'Sign Up') { return <SignUpForm active={status} style={styles.form} />; }
  if (formType === 'Sign In') { return <SignInForm active={status} style={styles.form} />; }
  if (formType === 'Book') { return <BookingForm active={status} style={styles.form} />; }
  return null;
};

Form.propTypes = {
  formType: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
};

export default Form;
