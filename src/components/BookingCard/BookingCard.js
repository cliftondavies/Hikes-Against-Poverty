import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const BookingCard = ({ booking }) => {
  const { date, city, hike_id: id } = booking;
  const hike = useSelector((state) => state.hikes.hikes.find((hike) => hike.id === id));

  const articleInfo = () => (
    <article>
      <h3>Type</h3>
      <span>{hike.name}</span>
      <h3>Date</h3>
      <span>{date}</span>
      <h3>Location</h3>
      <span>{city}</span>
    </article>
  );

  return (
    (booking) ? articleInfo() : (
      <article>
        <span>Empty</span>
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
