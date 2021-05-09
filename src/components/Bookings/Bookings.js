import BookingList from '../BookingList/BookingList';
import styles from './Bookings.module.scss';

const Bookings = () => (
  <main className={styles.bookings}>
    <h2>YOUR BOOKINGS</h2>

    <BookingList />
  </main>
);

export default Bookings;
