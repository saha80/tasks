import { Suspense, type FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Spinner } from '@/components/Spinner/Spinner';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

import styles from './App.module.css';

export const App: FC = () => {
  return (
    <>
      <Header />
      <main className={styles.app}>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default App;
