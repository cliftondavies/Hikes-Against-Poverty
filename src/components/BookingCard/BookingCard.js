import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './BookingCard.module.scss';

const BookingCard = ({ booking }) => {
  const { date, city, hike_id: id } = booking;
  const hike = useSelector((state) => state.hikes.hikes.find((hike) => hike.id === id));

  const articleBackground = (hikeName = '') => {
    const plainBackgrounds = [styles.green, styles.yellow, styles.blue, styles.black, styles.pink,
      styles.sky];

    switch (hikeName) {
      case 'Coast':
        return styles.coast;
      case 'Fjord':
        return styles.fjord;
      case 'Mountain':
        return styles.mountain;
      default:
        return plainBackgrounds[Math.floor(Math.random() * plainBackgrounds.length)];
    }
  };

  const articleInfo = () => (
    <article className={`${styles.bookingCard} ${articleBackground(hike ? hike.name : '')}`}>
      <h3>TYPE :</h3>
      <span>{hike ? hike.name : null}</span>
      <h3>DATE :</h3>
      <span>{date}</span>
      <h3>LOCATION :</h3>
      <span>{city}</span>
    </article>
  );

  return (
    (booking) ? articleInfo() : (
      <article className={`${styles.bookingCard} ${articleBackground()}`}>
        <span className={styles.empty}>EMPTY</span>
      </article>
    )
  );
};

BookingCard.defaultProps = {
  booking: false,
};

BookingCard.propTypes = {
  booking: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.objectOf(PropTypes.any),
  ]),
};

export default BookingCard;
