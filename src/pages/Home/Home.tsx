import { FC } from 'react';

import { Search } from '@/components/Search/Search';

import { Cards } from './components/Cards';

export const Home: FC = () => (
  <div className="search-cards">
    <Search />
    <Cards />
  </div>
);
