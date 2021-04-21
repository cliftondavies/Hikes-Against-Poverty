import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signUp } from '../../api/api';
import styles from './SignUpForm.module.scss';

const SignUpForm = ({ active }) => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const history = useHistory();
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

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const signUpResponse = await signUp({ name, email, password });

    if (!(signUpResponse instanceof Error)) {
      sessionStorage.setItem('user', JSON.stringify(signUpResponse));
      history.push('/hikes');
      setUser({ name: '', email: '', password: '' });
    }
  };

  return (
    <div className={formClass}>
      <h3>
        SIGN UP
      </h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <input id="name" name="name" onChange={handleChange} value={user.name} placeholder="Your Name" required />
        </label>
        <br />

        <label htmlFor="email">
          <input type="email" id="email" name="email" onChange={handleChange} value={user.email} placeholder="Your Email" required />
        </label>
        <br />

        <label htmlFor="password">
          <input type="password" id="password" name="password" onChange={handleChange} value={user.email} placeholder="Your Password" required />
        </label>
        <br />

        <input type="submit" value="SIGN UP" />
      </form>
    </div>
  );
};

SignUpForm.propTypes = {
  active: PropTypes.bool.isRequired,
};

export default SignUpForm;
