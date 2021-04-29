import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn } from '../../api/api';
import { login, loadError } from '../../redux/actions';
import styles from './SignInForm.module.scss';

const SignInForm = ({ active, formHandler, style }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const formClass = (active) ? styles.active : styles.inactive;
  const errorMessage = (error) ? 'Invalid email or password! Please try again.' : null;

  const handleChange = (e) => {
    if (e.target.id === 'email') {
      setUserEmail(e.target.value);
    } else if (e.target.id === 'password') {
      setUserPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formHandler(true);

    const email = userEmail;
    const password = userPassword;
    setUserEmail('');
    setUserPassword('');
    const signInResponse = await signIn({ email, password });

    if (signInResponse instanceof Error) {
      formHandler(false);
      dispatch(loadError({ error: signInResponse.message }));
    } else {
      sessionStorage.setItem('user', JSON.stringify(signInResponse));
      dispatch(login());
    }
  };

  return (
    <div className={`${style} ${formClass}`}>
      <form onSubmit={handleSubmit} className={styles.signInForm}>
        <label htmlFor="email">
          <span>{errorMessage}</span>
          <input type="email" id="email" name="email" onChange={handleChange} value={userEmail} placeholder="Your Email" required />
        </label>
        <br />

        <label htmlFor="password">
          <input type="password" id="password" name="password" onChange={handleChange} value={userPassword} placeholder="Your Password" required />
        </label>
        <br />

        <input type="submit" value="SIGN IN" />
      </form>
    </div>
  );
};

SignInForm.propTypes = {
  active: PropTypes.bool.isRequired,
  formHandler: PropTypes.func.isRequired,
  style: PropTypes.string.isRequired,
};

export default SignInForm;
