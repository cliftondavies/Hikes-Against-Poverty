import BookingList from '../BookingList/BookingList';
import styles from './Bookings.module.scss';

const Bookings = () => (
  <main className={styles.bookings}>
    <BookingList />
  </main>
);

export default Bookings;
