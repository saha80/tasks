import {
  forwardRef,
  type ChangeEventHandler,
  type FocusEventHandler,
  type ReactNode,
} from 'react';

import { Label } from '@/components/Label/Label';

import styles from './Select.module.css';

export interface SelectProps {
  label: ReactNode;

  children: { label: ReactNode; value: string }[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  onBlur?: FocusEventHandler<HTMLSelectElement>;
  name?: string;
  required?: boolean;
  disabled?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, label, required, ...other }, ref) => (
    <Label required={required}>
      {label}

      <select
        className={`${styles.select} select`}
        ref={ref}
        defaultValue=""
        required={required}
        {...other}
      >
        {<option defaultValue="" />}

        {children.map(({ value, label }) => (
          <option defaultValue={value} key={value} className="select-option">
            {label}
          </option>
        ))}
      </select>
    </Label>
  )
);
