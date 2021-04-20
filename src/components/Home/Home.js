import { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonList from '../ButtonList/ButtonList';
import Form from '../Form/Form';

const Home = () => {
  const [form, setForm] = useState({ type: '', status: false });
  const paragraph = 'There are over a million people living in poverty in the UK. Hikes Against Poverty is on a mission to raise funds for charities fighting against poverty in all its forms. We do this by organising daily hikes to breathtaking locations. 100% of all money raised from fees is donated to select charities. So what are you waiting for?! Join us today, enjoy nature and stay healthy.';

  const handleClick = (buttonText) => {
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

  return (
    <div>
      <Link to="/">Hikes Against Poverty</Link>

      <div>
        <h1>BOOK A HIKE AGAINST POVERTY</h1>

        <p>{paragraph}</p>

        <ButtonList buttonType={form.type} clickHandler={handleClick} />

        <Form formType={form.type} status={form.status} />
      </div>
    </div>
  );
};

export default Home;
