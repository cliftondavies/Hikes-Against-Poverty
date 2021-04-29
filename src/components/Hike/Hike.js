import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getHikes } from '../../api/api';
import Button from '../Button/Button';
import Form from '../Form/Form';
import styles from './Hike.module.scss';

const Hike = ({ hike }) => {
  const [button, setStatus] = useState({ status: false });
  const { hikesLoading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  let name;
  let image;

  if (hike) {
    name = hike.name;
    image = hike.main_image;
  }

  useEffect(() => {
    if (hikesLoading === 'idle' && JSON.parse(sessionStorage.getItem('user'))) {
      const storedResponse = JSON.parse(sessionStorage.getItem('user'));
      const {
        accessToken, uid, client, tokenType, expiry,
      } = storedResponse.authentication;

      dispatch(getHikes({
        accessToken, uid, client, tokenType, expiry,
      }));
    }
  }, [hikesLoading, dispatch]);

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
    <main className={styles.hike}>
      <section>
        <img src={image} width="580" height="660" alt="main" />

        <span>&#9667;</span>
      </section>
      <section>
        <h2>{name}</h2>

        <span>- optional booking fees</span>

        <table>
          <tbody>
            {tableRow('Travel fee', '£20')}
            {tableRow('Meal fee', '£10')}
            {tableRow('Gear fee', '£10')}
            {tableRow('Total amount payable', '£40')}
          </tbody>
        </table>

        <span>
          <strong>100%</strong>
          {' of fees are donated'}
        </span>

        <Link to="/hikes">SEE MORE HIKES &#8250;</Link>

        <Button buttonText="Book A Hike" clickHandler={handleClick} active={button.status} />

        <Form formType="Book" status={button.status} />
      </section>
    </main>
  );
};

Hike.defaultProps = {
  hike: undefined,
};

Hike.propTypes = {
  hike: PropTypes.objectOf(PropTypes.any),
};

export default Hike;
