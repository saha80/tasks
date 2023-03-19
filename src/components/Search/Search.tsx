import { Component } from 'react';

import { Input, InputProps } from './components/Input';
import { Icon } from './components/Icon';

import './Search.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SearchProps {}

interface SearchState {
  value: string | null;
}

const SearchStorageKey = 'search-input-value';

export class Search extends Component<SearchProps, SearchState> {
  state = { value: null };

  onChange = (...parameters: Parameters<InputProps['onChange']>) => {
    const [event] = parameters;
    this.setState({ value: event.target.value });
  };

  setSearchStorageValue = () => {
    if (this.state.value !== null) {
      window.localStorage.setItem(SearchStorageKey, this.state.value);
    }
  };

  componentDidMount() {
    const storageValue = window.localStorage.getItem(SearchStorageKey);
    if (storageValue !== null) {
      this.setState({ value: storageValue });
    }
    window.addEventListener('beforeunload', this.setSearchStorageValue);
  }

  componentWillUnmount() {
    this.setSearchStorageValue();
    window.removeEventListener('beforeunload', this.setSearchStorageValue);
  }

  render() {
    return (
      <div className="search">
        <Icon>🔍</Icon>
        <Input value={this.state.value ?? ''} onChange={this.onChange}></Input>
      </div>
    );
  }
}
