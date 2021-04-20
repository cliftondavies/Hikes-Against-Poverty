import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { book } from '../../api/api';
import styles from './BookingForm.module.scss';

const BookingForm = ({ active }) => {
  const [booking, setBooking] = useState({ date: '', city: '' });
  const dispatch = useDispatch();
  let { hikeID } = useParams();
  const CITIES = ['London', 'Glasgow', 'Cardiff', 'Belfast'];
  const formClass = (active) ? styles.active : styles.inactive;

  const handleChange = (e) => {
    if (e.target.id === 'date') {
      setBooking({ date: e.target.value, city: booking.city });
    } else if (e.target.id === 'city') {
      setBooking({ date: booking.date, city: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const city = document.getElementById('city').value;
    hikeID = Number(hikeID);
    const bookingParams = { date, city, hike_id: hikeID };

    if (JSON.parse(sessionStorage.getItem('user'))) {
      const storedResponse = JSON.parse(sessionStorage.getItem('user'));
      const {
        accessToken, uid, client, tokenType, expiry,
      } = storedResponse.authentication;
      dispatch(book(hikeID, bookingParams, {
        accessToken, uid, client, tokenType, expiry,
      }));
      setBooking({ date: '', city: '' });
    }
  };

  return (
    <div className={formClass}>
      <h3>
        BOOK A HIKE
      </h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="date">
          <input type="date" id="date" name="date" onChange={handleChange} value={booking.date} required />
        </label>
        <br />

        <label htmlFor="city">
          <select name="city" id="city" value={booking.city || 'Choose a city'} onChange={handleChange} required>
            <option value="Choose a city" disabled>Choose a city</option>
            <option value={CITIES[0]}>{CITIES[0]}</option>
            <option value={CITIES[1]}>{CITIES[1]}</option>
            <option value={CITIES[2]}>{CITIES[2]}</option>
            <option value={CITIES[3]}>{CITIES[3]}</option>
          </select>
        </label>
        <br />

        <input type="submit" value="BOOK A HIKE" />
      </form>
    </div>
  );
};

BookingForm.propTypes = {
  active: PropTypes.bool.isRequired,
};

export default BookingForm;
