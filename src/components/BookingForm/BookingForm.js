import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userBookings, book } from '../../api/api';
import styles from './BookingForm.module.scss';

const BookingForm = ({ active, style }) => {
  const { bookings } = useSelector((state) => state.bookings);
  const { bookingsLoading } = useSelector((state) => state.loading);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingCity, setBookingCity] = useState('');
  const [styyle, setStyle] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  let { hikeID } = useParams();
  const CITIES = ['London', 'Glasgow', 'Cardiff', 'Belfast'];
  const formClass = (active) ? styles.active : styles.inactive;

  useEffect(() => {
    if (bookingsLoading === 'idle' && JSON.parse(sessionStorage.getItem('user'))) {
      const storedResponse = JSON.parse(sessionStorage.getItem('user'));
      const {
        accessToken, uid, client, tokenType, expiry,
      } = storedResponse.authentication;

      dispatch(userBookings({
        accessToken, uid, client, tokenType, expiry,
      }));
    }
  }, [bookingsLoading, dispatch]);

  const handleChange = (e) => {
    if (e.target.id === 'date') {
      setBookingDate(e.target.value);
    } else if (e.target.id === 'city') {
      setBookingCity(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const date = bookingDate;
    const city = bookingCity;
    const dateMatch = bookings.find((booking) => date === booking.date);

    if (dateMatch) {
      setBookingError('You already have a booking for this day!');
      setTimeout(() => { setBookingError(null); }, 3000);
    } else {
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

        setBookingDate('');
        setBookingCity('');
        setStyle(styles.inactive);
        history.push('/bookings');
      }
    }
  };

  const formatDate = () => {
    const date = new Date();
    const MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08',
      '09', '10', '11', '12'];
    let dateDigit = date.getDate();
    if (dateDigit < 10) { dateDigit = `0${dateDigit}`; }
    const month = MONTHS[date.getMonth()];
    const year = date.getFullYear();
    return `${year}-${month}-${dateDigit}`;
  };

  return (
    <div className={`${style} ${styyle || formClass}`}>
      <form onSubmit={handleSubmit} className={styles.bookingForm}>
        <label htmlFor="date">
          <span>{bookingError}</span>

          <input type="date" id="date" name="date" onChange={handleChange} value={bookingDate} min={formatDate()} required />
        </label>
        <br />

        <label htmlFor="city">
          <select name="city" id="city" value={bookingCity} onChange={handleChange} required>
            <option value="" disabled>Choose a city</option>
            <option value={CITIES[0]}>{CITIES[0]}</option>
            <option value={CITIES[1]}>{CITIES[1]}</option>
            <option value={CITIES[2]}>{CITIES[2]}</option>
            <option value={CITIES[3]}>{CITIES[3]}</option>
          </select>
        </label>
        <br />

        <input type="submit" value="BOOK" />
      </form>
    </div>
  );
};

BookingForm.propTypes = {
  active: PropTypes.bool.isRequired,
  style: PropTypes.string.isRequired,
};

export default BookingForm;
