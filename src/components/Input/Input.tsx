import { ReactNode, forwardRef } from 'react';

import './Input.css';

export type InputType =
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'url';

export interface InputProps {
  type: InputType;
  label: ReactNode;
  pattern?: string;

  /** @default false */
  required?: boolean;

  /** @default false */
  disabled?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, label, pattern, disabled, required }, ref) => {
    return (
      <div className="input">
        <label className="label">
          {label}

          <input
            ref={ref}
            type={type}
            pattern={pattern}
            disabled={disabled}
            required={required}
          />
        </label>
      </div>
    );
  }
);
