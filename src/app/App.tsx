import { type FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Spinner } from '@/components/Spinner/Spinner';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

import styles from './App.module.css';

export const App: FC = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Header />
      <main className={styles.app}>
        <Outlet />
      </main>
      <Footer />
    </Suspense>
  );
};

export default App;
