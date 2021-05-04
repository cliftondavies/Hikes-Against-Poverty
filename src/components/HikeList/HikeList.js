import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setLoadingStatus } from '../../redux/actions';
import { getHikes } from '../../api/api';
import HikeCard from '../HikeCard/HikeCard';
import styles from './HikeList.module.scss';

const HikeList = ({ hikes }) => {
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('user'))) {
      dispatch(setLoadingStatus(true));

      const storedResponse = JSON.parse(sessionStorage.getItem('user'));
      const {
        accessToken, uid, client, tokenType, expiry,
      } = storedResponse.authentication;

      dispatch(getHikes({
        accessToken, uid, client, tokenType, expiry,
      }));
    }
  }, []);

  return (
    <div className={styles.hikeList}>
      {(hikes && hikes.length > 0) ? hikes.map((hike) => (
        <HikeCard hike={hike} key={hike.id} />
      )) : <span>{error}</span>}
    </div>
  );
};

HikeList.propTypes = {
  hikes: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default HikeList;
