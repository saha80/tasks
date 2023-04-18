import { FC } from 'react';

import { Search } from './components/Search';
import { Cards } from './components/Cards';

import styles from './Home.module.css';

export const Home: FC = () => (
  <div className={styles.home}>
    <Search className={styles.search} />
    <Cards />
  </div>
);
