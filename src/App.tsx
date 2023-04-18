import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Footer, Header } from '@/components';
import { store } from '@/app/store';

import styles from './App.module.css';

export const App: FC = () => (
  <Provider store={store}>
    <Header />
    <main className={styles.app}>
      <Outlet />
    </main>
    <Footer />
  </Provider>
);
