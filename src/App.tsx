import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer, Header } from '@/components';

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
