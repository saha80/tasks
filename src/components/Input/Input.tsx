import { ReactNode, forwardRef, ForwardRefRenderFunction } from 'react';

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

const InputRender: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { type, label, pattern, disabled, required },
  ref
) => (
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

export const Input = forwardRef(InputRender);
