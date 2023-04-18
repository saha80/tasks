import {
  ChangeEventHandler,
  FocusEventHandler,
  ReactNode,
  forwardRef,
} from 'react';

import { Label } from '@/components';

import styles from './Input.module.css';

export type InputType =
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'url';

export interface InputProps {
  label: ReactNode;

  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name?: string;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
  /** @default 'text' */
  type?: InputType;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, required, type = 'text', ...other }, ref) => (
    <Label required={required}>
      {label}

      <input
        className={styles.input}
        ref={ref}
        type={type}
        required={required}
        {...other}
      />
    </Label>
  )
);
