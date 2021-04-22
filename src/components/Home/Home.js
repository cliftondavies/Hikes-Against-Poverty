import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import ButtonList from '../ButtonList/ButtonList';
import Form from '../Form/Form';

const Home = () => {
  const [form, setForm] = useState({ type: '', status: false });
  const [sent, setSent] = useState(false);
  const paragraph = 'There are over a million people living in poverty in the UK. Hikes Against Poverty is on a mission to raise funds for charities fighting against poverty in all its forms. We do this by organising daily hikes to breathtaking locations. 100% of all money raised from fees is donated to select charities. So what are you waiting for?! Join us today, enjoy nature and stay healthy.';

  const handleButtonClick = (buttonText) => {
    if (buttonText === 'Sign Up' && form.type === 'Sign Up') {
      setForm({ type: '', status: !form.status });
    } else if (buttonText === 'Sign In' && form.type === 'Sign In') {
      setForm({ type: '', status: !form.status });
    } else if (buttonText === 'Sign Up') {
      setForm({ type: 'Sign Up', status: true });
    } else if (buttonText === 'Sign In') {
      setForm({ type: 'Sign In', status: true });
    }
  };

  const handleFormSubmit = (status) => {
    setSent(status);
  };

  const homeMain = (
    <div>
      <h1>BOOK A HIKE AGAINST POVERTY</h1>

      <p>{paragraph}</p>

      <ButtonList buttonType={form.type} clickHandler={handleButtonClick} />

      <Form formType={form.type} status={form.status} formHandler={handleFormSubmit} />
    </div>
  );

  const loader = (
    <Loader
      type="Bars"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={10000}
    />
  );

  return (
    <div>
      <Link to="/">Hikes Against Poverty</Link>

      {sent ? loader : homeMain}
    </div>
  );
};

export default Home;
