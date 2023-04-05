import { forwardRef } from 'react';

import styles from './Search.module.css';

export interface SearchProps {
  value: string | null;
  onChange: (value: string) => void;

  autoComplete?: string;
  className?: string;
  list?: string;
  maxLength?: number;
  minLength?: number;
  name?: string;
  pattern?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(
  ({ value, onChange, className = '', ...other }, ref) => (
    <div className={styles.search}>
      <span className={`${styles['search-icon']} material-icons`}>search</span>
      <input
        type="search"
        role="search"
        className={`${styles['search-input']} ${className}`}
        spellCheck={true}
        onChange={(event) => onChange(event.target.value)}
        value={value ?? ''}
        ref={ref}
        {...other}
      />
    </div>
  )
);
