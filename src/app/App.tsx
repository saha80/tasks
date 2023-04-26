import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer, Header } from '@/components';
import { Spinner } from '@/components/Spinner/Spinner';

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
