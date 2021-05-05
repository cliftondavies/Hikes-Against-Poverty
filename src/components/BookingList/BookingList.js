import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BookingCard from '../BookingCard/BookingCard';
import { setLoadingStatus } from '../../redux/actions';
import { userBookings, getHikes } from '../../api/api';
import styles from './BookingList.module.scss';

const BookingList = () => {
  const { bookings } = useSelector((state) => state.bookings);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const extraBookingCards = 9 - bookings.length;

  const padBookings = (difference) => {
    const result = [];
    for (let i = 0; i < difference; i += 1) {
      result.push(<BookingCard key={i} />);
    }
    return result;
  };

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('user'))) {
      dispatch(setLoadingStatus(true));

      const storedResponse = JSON.parse(sessionStorage.getItem('user'));
      const {
        accessToken, uid, client, tokenType, expiry,
      } = storedResponse.authentication;

      dispatch(userBookings({
        accessToken, uid, client, tokenType, expiry,
      }));
      dispatch(getHikes({
        accessToken, uid, client, tokenType, expiry,
      }));
    }
  }, []);

  return (
    <div className={styles.bookingList}>
      {(bookings && bookings.length > 0) ? bookings.map((booking) => (
        <BookingCard booking={booking} key={booking.id} />
      )) : null}
      {(error) ? <span>{error}</span> : null}
      {(extraBookingCards > 0) ? padBookings(extraBookingCards) : null}
    </div>
  );
};

export default BookingList;
