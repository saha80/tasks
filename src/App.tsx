import { Component } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { CardsContext, initialCardsContextValue } from '@/context/CardsContext';

import styles from './App.module.css';

interface AppState {
  search: { value: string | null };
}

export class App extends Component<Record<string, never>, AppState> {
  state: AppState = { search: { value: null } };

  onChange = (value: string) => {
    this.setState({ search: { value } });
  };

  render() {
    return (
      <CardsContext.Provider
        value={{
          ...initialCardsContextValue,
          searchValue: this.state.search.value,
          onChange: this.onChange,
        }}
      >
        <Header />
        <main className={styles.app}>
          <Outlet />
        </main>
        <Footer />
      </CardsContext.Provider>
    );
  }
}
