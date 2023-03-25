import { FC } from 'react';

import { CardsContext } from '@/components/Cards/CardsContext';

import { Input } from './components/Input';
import { Icon } from './components/Icon';

import './Search.css';

export const Search: FC = () => (
  <div className="search">
    <Icon>
      <span className="material-icons">search</span>
    </Icon>
    <CardsContext.Consumer>
      {({ searchValue, onChange, filterBy }) => (
        <Input value={searchValue} onChange={onChange} filterBy={filterBy} />
      )}
    </CardsContext.Consumer>
  </div>
);
