import { Component, ChangeEventHandler } from 'react';

const MIN_LENGTH = 3;
const PLACEHOLDER = 'Search...';

export interface InputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export class Input extends Component<InputProps> {
  render() {
    const { onChange, value } = this.props;
    return (
      <input
        type="search"
        role="search"
        className="search-input"
        minLength={MIN_LENGTH}
        maxLength={Number.MAX_SAFE_INTEGER}
        placeholder={PLACEHOLDER}
        name="q"
        spellCheck={true}
        onChange={onChange}
        value={value}
      />
    );
  }
}
