import { forwardRef } from 'react';

import styles from './Search.module.css';

export interface SearchProps {
  value: string | null;
  onChange: (value: string) => void;

  className?: string;

  placeholder?: string;

  list?: string;
  autoComplete?: string;
  pattern?: string;

  /** @default 3 */
  minLength?: number;

  /** @default 120 */
  maxLength?: number;

  /** @default 'q' */
  name?: string;

  /** @default false */
  required?: boolean;

  /** @default false */
  readOnly?: boolean;
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      value,
      onChange,
      className,
      placeholder,
      list,
      autoComplete,
      pattern,
      minLength = 3,
      maxLength = 120,
      name = 'q',
      required = false,
      readOnly = false,
    },
    ref
  ) => (
    <div className={styles['search']}>
      <span className={`${styles['search-icon']} material-icons`}>search</span>
      <input
        type="search"
        role="search"
        className={`${styles['search-input']} ${className || ''}`}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        name={name}
        spellCheck={true}
        onChange={(event) => onChange(event.target.value)}
        value={value ?? ''}
        list={list}
        autoComplete={autoComplete}
        pattern={pattern}
        required={required}
        readOnly={readOnly}
        ref={ref}
      />
    </div>
  )
);
