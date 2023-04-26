import { InputHTMLAttributes, forwardRef } from 'react';

import { MdSearch } from 'react-icons/md/index';

import styles from './Search.module.css';

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
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
  ({ className = '', ...other }, ref) => (
    <div className={styles.search}>
      <MdSearch className={styles.searchIcon} />
      <input
        type="search"
        className={`${styles.searchInput} search ${className}`}
        spellCheck={true}
        ref={ref}
        {...other}
      />
    </div>
  )
);
