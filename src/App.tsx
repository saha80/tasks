import { FC, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header, Footer } from '@/components';
import {
  CardsContext,
  CardsContextType,
  initialCardsContextValue,
} from '@/context/CardsContext';

import styles from './App.module.css';

export const App: FC = () => {
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const value = useMemo<CardsContextType>(
    () => ({
      ...initialCardsContextValue,
      searchValue,
      onChange: setSearchValue,
    }),
    [searchValue]
  );

  return (
    <CardsContext.Provider value={value}>
      <Header />
      <main className={styles.app}>
        <Outlet />
      </main>
      <Footer />
    </CardsContext.Provider>
  );
};
