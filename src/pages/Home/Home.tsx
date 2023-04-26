import { FC } from 'react';

import { Search } from '@/components/Search/Search';

import { Cards } from './components/Cards';

import './Home.css';

export const Home: FC = () => (
  <div className="search-cards">
    <Search />
    <Cards />
  </div>
);
