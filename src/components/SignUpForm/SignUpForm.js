import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { signUp } from '../../api/api';
import { login } from '../../redux/actions';
import styles from './SignUpForm.module.scss';

const SignUpForm = ({ active, formHandler, style }) => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const formClass = (active) ? styles.active : styles.inactive;

  const handleChange = (e) => {
    if (e.target.id === 'name') {
      setUser({ name: e.target.value, email: user.email, password: user.password });
    } else if (e.target.id === 'email') {
      setUser({ name: user.name, email: e.target.value, password: user.password });
    } else if (e.target.id === 'password') {
      setUser({ name: user.name, email: user.email, password: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formHandler(true);

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    setUser({ name: '', email: '', password: '' });
    const signUpResponse = await signUp({ name, email, password });

    if (signUpResponse instanceof Error) {
      formHandler(false);
    } else {
      sessionStorage.setItem('user', JSON.stringify(signUpResponse));
      dispatch(login());
    }
  };

  return (
    <div className={`${style} ${formClass}`}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <input type="text" id="name" name="name" onChange={handleChange} value={user.name} placeholder="Your Name" required />
        </label>
        <br />

        <label htmlFor="email">
          <input type="email" id="email" name="email" onChange={handleChange} value={user.email} placeholder="Your Email" required />
        </label>
        <br />

        <label htmlFor="password">
          <input type="password" id="password" name="password" onChange={handleChange} value={user.password} placeholder="Your Password" required />
        </label>
        <br />

        <input type="submit" value="SIGN UP" />
      </form>
    </div>
  );
};

SignUpForm.propTypes = {
  active: PropTypes.bool.isRequired,
  formHandler: PropTypes.func.isRequired,
  style: PropTypes.string.isRequired,
};

export default SignUpForm;
