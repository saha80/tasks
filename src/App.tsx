import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';

import './App.css';

export class App extends Component {
  render() {
    return (
      <>
        <Header />
        <main className="app">
          <Outlet />
        </main>
      </>
    );
  }
}
