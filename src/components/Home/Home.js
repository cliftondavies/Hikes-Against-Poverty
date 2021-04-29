import { useState } from 'react';
import Loader from 'react-loader-spinner';
import ButtonList from '../ButtonList/ButtonList';
import Form from '../Form/Form';
import styles from './Home.module.scss';

const Home = () => {
  const [formType, setFormType] = useState('');
  const [formStatus, setFormStatus] = useState(false);
  const [sent, setSent] = useState(false);
  const paragraph = 'There are over a million people living in poverty in the UK. Hikes Against Poverty is on a mission to raise funds for charities fighting against poverty in all its forms. We do this by organising daily hikes to breathtaking locations. 100% of all money raised from fees is donated to select charities.';

  const handleButtonClick = (buttonText) => {
    if (buttonText === 'Sign Up' && formType === 'Sign Up') {
      setFormType('');
      setFormStatus(!formStatus);
    } else if (buttonText === 'Sign In' && formType === 'Sign In') {
      setFormType('');
      setFormStatus(!formStatus);
    } else if (buttonText === 'Sign Up') {
      setFormType('Sign Up');
      setFormStatus(true);
    } else if (buttonText === 'Sign In') {
      setFormType('Sign In');
      setFormStatus(true);
    }
  };

  const handleFormSubmit = (status) => {
    setSent(status);
  };

  const homeMain = (
    <div className={styles.homeInfo}>
      <h1>BOOK A HIKE AGAINST POVERTY</h1>

      <p>{paragraph}</p>

      <ButtonList buttonType={formType} clickHandler={handleButtonClick} />

      <Form formType={formType} status={formStatus} formHandler={handleFormSubmit} />
    </div>
  );

  const loader = (
    <Loader
      type="Bars"
      color="#97BF0F"
      height={100}
      width={100}
    />
  );

  return (
    <div className={styles.home}>
      {sent ? loader : homeMain}
    </div>
  );
};

export default Home;
