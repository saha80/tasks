import { Component } from 'react';

import { CardsContext } from '@/pages/Cards/CardsContext';

import { Input } from './components/Input';
import { Icon } from './components/Icon';

import './Search.css';

export class Search extends Component<Record<string, never>, Record<string, never>> {
  render() {
    return (
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
  }
}
