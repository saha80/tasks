import { FC, useMemo, useState } from 'react';

import { CardsContext, CardsContextType } from '@/context/CardsContext';
import { searchLocalStorage } from '@/utils/searchLocalStorage';
import { unsplashService } from '@/services/unsplash.servise';

import { Search } from './components/Search';
import { Cards } from './components/Cards';

import styles from './Home.module.css';

export const Home: FC = () => {
  const [searchValue, setSearchValue] = useState(searchLocalStorage.get());

  const value = useMemo<CardsContextType>(
    () => ({
      searchValue,
      onSearch: setSearchValue,
      service: unsplashService,
    }),
    [searchValue]
  );

  return (
    <CardsContext.Provider value={value}>
      <div className={styles.home}>
        <Search className={styles.search} />
        <Cards />
      </div>
    </CardsContext.Provider>
  );
};
