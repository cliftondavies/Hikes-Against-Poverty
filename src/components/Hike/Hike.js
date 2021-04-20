import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getHikes } from '../../api/api';
import Button from '../Button/Button';
import Form from '../Form/Form';

const Hike = ({ hike }) => {
  const [button, setStatus] = useState({ status: false });
  const { hikes, loading } = useSelector((state) => state.hikes);
  const dispatch = useDispatch();
  const { hikeID } = useParams();
  const newHike = hikes.find((hike) => hike.id === Number(hikeID));
  const { name, main_image: image } = hike || newHike;

  useEffect(() => {
    if (loading === 'idle' && JSON.parse(sessionStorage.getItem('user'))) {
      const storedResponse = JSON.parse(sessionStorage.getItem('user'));
      const {
        accessToken, uid, client, tokenType, expiry,
      } = storedResponse.authentication;

      dispatch(getHikes({
        accessToken, uid, client, tokenType, expiry,
      }));
    }
  }, [loading, dispatch]);

  const tableRow = (feeType, price) => (
    <tr>
      <td>{feeType}</td>
      <td>{price}</td>
    </tr>
  );

  const handleClick = (buttonText) => {
    if (buttonText === 'Book A Hike') {
      setStatus({ status: !button.status });
    }
  };

  return (
    <main>
      <section>
        <img src={image} width="600" height="600" alt="main" />
        <div><span role="img" aria-label="play backward">◀️</span></div>
      </section>
      <section>
        <h2>{name}</h2>

        <span>- optional costs available to any booking</span>

        <table>
          {tableRow('Travel fee', '£20')}
          {tableRow('Meal fee', '£10')}
          {tableRow('Gear fee', '£10')}
          {tableRow('Total amount payabke', '£40')}
        </table>

        <span>100% of fees are donated</span>

        <Link to="/hikes">SEE MORE HIKES &#8250;</Link>

        <Button buttonText="Book A Hike" clickHandler={handleClick} active={button.status} />

        <Form formType="Book" status={button.status} />
      </section>
    </main>
  );
};

Hike.propTypes = {
  hike: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Hike;
