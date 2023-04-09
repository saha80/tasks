import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header, Footer } from '@/components';

import styles from './App.module.css';

export const App: FC = () => (
  <>
    <Header />
    <main className={styles.app}>
      <Outlet />
    </main>
    <Footer />
  </>
);
