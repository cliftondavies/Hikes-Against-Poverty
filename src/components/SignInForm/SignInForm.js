import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn } from '../../api/api';
import { login } from '../../redux/actions';
import styles from './SignInForm.module.scss';

const SignInForm = ({ active, formHandler }) => {
  const [user, setUser] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const formClass = (active) ? styles.active : styles.inactive;

  const handleChange = (e) => {
    if (e.target.id === 'email') {
      setUser({ email: e.target.value, password: user.password });
    } else if (e.target.id === 'password') {
      setUser({ email: user.email, password: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formHandler(true);

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const signInResponse = await signIn({ email, password });

    if (signInResponse instanceof Error) {
      formHandler(false);
    } else {
      sessionStorage.setItem('user', JSON.stringify(signInResponse));
      setUser({ email: '', password: '' });
      dispatch(login());
    }
  };

  return (
    <div className={formClass}>
      <h3>
        SIGN IN
      </h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input type="email" id="email" name="email" onChange={handleChange} value={user.email} placeholder="Your Email" required />
        </label>
        <br />

        <label htmlFor="password">
          <input type="password" id="password" name="password" onChange={handleChange} value={user.password} placeholder="Your Password" required />
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
};

export default SignInForm;
