import { type FC } from 'react';

import { Search } from './components/Search';
import { CardListDetails as Cards } from '@/features/CardListDetails';

import styles from './Home.module.css';

export const Home: FC = () => (
  <div className={styles.home}>
    <Search className={styles.search} />
    <Cards />
  </div>
);

export default Home;
