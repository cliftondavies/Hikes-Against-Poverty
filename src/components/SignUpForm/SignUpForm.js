import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { signUp } from '../../api/api';
import { setLoadingStatus, setError, login } from '../../redux/actions';
import styles from './SignUpForm.module.scss';

const SignUpForm = ({ active, style }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const formClass = (active) ? styles.active : styles.inactive;

  const handleChange = (e) => {
    if (e.target.id === 'name') {
      setUserName(e.target.value);
    } else if (e.target.id === 'email') {
      setUserEmail(e.target.value);
    } else if (e.target.id === 'password') {
      setUserPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoadingStatus(true));

    const name = userName;
    const email = userEmail;
    const password = userPassword;
    setUserName('');
    setUserEmail('');
    setUserPassword('');
    const signUpResponse = await signUp({ name, email, password });
    dispatch(setLoadingStatus(false));

    if (signUpResponse instanceof Error) {
      dispatch(setError({ error: 'Invalid email or password! Please try another.' }));
      setTimeout(() => { dispatch(setError({ error: null })); }, 3000);
    } else {
      sessionStorage.setItem('user', JSON.stringify(signUpResponse));
      dispatch(login());
    }
  };

  return (
    <div className={`${style} ${formClass}`}>
      <form onSubmit={handleSubmit} className={styles.signUpForm}>
        <label htmlFor="name">
          <span>{error}</span>

          <input type="text" id="name" name="name" onChange={handleChange} value={userName} placeholder="Your Name" required />
        </label>
        <br />

        <label htmlFor="email">
          <input type="email" id="email" name="email" onChange={handleChange} value={userEmail} placeholder="Your Email" required />
        </label>
        <br />

        <label htmlFor="password">
          <input type="password" id="password" name="password" onChange={handleChange} value={userPassword} placeholder="Your Password" required />
        </label>
        <br />

        <input type="submit" value="SIGN UP" />
      </form>
    </div>
  );
};

SignUpForm.propTypes = {
  active: PropTypes.bool.isRequired,
  style: PropTypes.string.isRequired,
};

export default SignUpForm;
