import { useSelector } from 'react-redux';
import HikeList from '../HikeList/HikeList';
import styles from './Hikes.module.scss';

const Hikes = () => {
  const { hikes } = useSelector((state) => state.hikes);

  return (
    <main className={styles.hikes}>
      <span>&#9657;</span>
      <span>&#9667;</span>

      <h2>AVAILABLE HIKES</h2>

      <span>Please select a hike</span>

      <HikeList hikes={hikes} />
    </main>
  );
};

export default Hikes;
