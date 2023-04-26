import { forwardRef } from 'react';

import './DatePicker.css';

export interface DatePickerProps {
  label: string;

  min?: string;

  /** @default false */
  required?: boolean;

  /** @default false */
  disabled?: boolean;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, min, required = false, disabled = false }, ref) => {
    return (
      <label className="label">
        {label}

        <input
          ref={ref}
          type="date"
          min={min}
          required={required}
          disabled={disabled}
        />
      </label>
    );
  }
);
