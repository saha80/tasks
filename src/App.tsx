import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { CardsContext, initialCardsContextValue } from '@/context/CardsContext';

import styles from './App.module.css';

export const App: FC = () => {
  const [searchValue, setSearchValue] = useState<string | null>(null);

  return (
    <CardsContext.Provider
      value={{
        ...initialCardsContextValue,
        searchValue,
        onChange: setSearchValue,
      }}
    >
      <Header />
      <main className={styles.app}>
        <Outlet />
      </main>
      <Footer />
    </CardsContext.Provider>
  );
};
