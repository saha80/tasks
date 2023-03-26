import { forwardRef, ReactNode } from 'react';

import './Select.css';

export interface SelectProps {
  children: Array<string>;

  label: ReactNode;

  /** @default false */
  required?: boolean;

  /** @default false */
  disabled?: boolean;

  /** @default false */
  multiple?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { children, label, required = false, disabled = false, multiple = false },
    ref
  ) => (
    <div className="select">
      <label className="label">
        {label}

        <select
          multiple={multiple}
          ref={ref}
          defaultValue={multiple ? [] : ''}
          required={required}
          disabled={disabled}
        >
          {!multiple && <option defaultValue="" />}

          {children.filter(Boolean).map((option, index) => (
            <option defaultValue={option} key={index} className="select-option">
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
);
