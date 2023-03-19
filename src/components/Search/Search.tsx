import { Component } from 'react';

import { Input } from './components/Input';
import { Icon } from './components/Icon';

import './Search.css';
import { CardsContext } from '../Cards/CardsContext';

export class Search extends Component<Record<string, never>, Record<string, never>> {
  render() {
    return (
      <div className="search">
        <Icon>🔍</Icon>
        <CardsContext.Consumer>
          {({ searchValue, onChange, filterBy }) => (
            <Input value={searchValue} onChange={onChange} filterBy={filterBy} />
          )}
        </CardsContext.Consumer>
      </div>
    );
  }
}
