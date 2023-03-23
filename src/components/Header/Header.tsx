import { Component } from 'react';

import { Search } from '@/components/Search/Search';
import { ROOT_CHILDREN } from '@/routes/Routes';

import { Nav } from './components/Nav';

import './Header.css';

export class Header extends Component {
  render() {
    return (
      <header className="header">
        <Nav routes={ROOT_CHILDREN} />
        <Search />
      </header>
    );
  }
}
