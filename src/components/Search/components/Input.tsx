import { Component } from 'react';

const MIN_LENGTH = 3;
const SearchStorageKey = 'search-input-value';

export interface InputProps {
  value: string | null;
  onChange: (value: string) => void;
  filterBy: string;
}

export class Input extends Component<InputProps, never> {
  setSearchStorageValue = () => {
    const { value } = this.props;
    if (value !== null) {
      window.localStorage.setItem(SearchStorageKey, value ?? '');
    }
  };

  componentDidMount() {
    window.addEventListener('beforeunload', this.setSearchStorageValue);
    const storageValue = window.localStorage.getItem(SearchStorageKey);
    if (storageValue !== null) {
      this.props.onChange(storageValue);
    }
  }

  componentWillUnmount() {
    this.setSearchStorageValue();
    window.removeEventListener('beforeunload', this.setSearchStorageValue);
  }

  render() {
    const { onChange, value, filterBy } = this.props;
    return (
      <input
        type="search"
        role="search"
        className="search-input"
        minLength={MIN_LENGTH}
        maxLength={Number.MAX_SAFE_INTEGER}
        placeholder={`Search by ${filterBy}...`}
        name="q"
        spellCheck={true}
        onChange={(event) => onChange(event.target.value)}
        value={value ?? ''}
      />
    );
  }
}
