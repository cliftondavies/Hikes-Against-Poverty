import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import facebook from '../../assets/facebook.svg';
import google from '../../assets/google-plus.svg';
import twitter from '../../assets/twitter.svg';
import styles from './HikeCard.module.scss';

const HikeCard = ({ hike }) => {
  const { id, name, thumbnail_image: thumbnail } = hike;
  const description = {
    Coast: 'The coast hike is approximately 10 miles long with stunning views of white cliffs and black sand.',
    Fjord: 'This hike follows a meandering path along the fjord with opportunities to spot whales along the way.',
    Mountain: 'The mountain hike features an ascent of 1000 meters with plenty of wildlife on display.',
  };

  return (
    <article className={styles.hikeCard}>
      <div>
        <Link to={`hikes/${id}`} />

        <img src={thumbnail} width="180" height="180" alt="thumbnail" />

        <h3>{name}</h3>

        <p>{description[name]}</p>
      </div>

      <div>
        <img src={facebook} width="23" height="23" alt="facebook-logo" />
        <img src={google} width="23" height="23" alt="google-logo" />
        <img src={twitter} width="23" height="23" alt="twitter-logo" />
      </div>
    </article>
  );
};

HikeCard.propTypes = {
  hike: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default HikeCard;
