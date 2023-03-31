import { forwardRef, ForwardRefRenderFunction } from 'react';

import './DatePicker.css';

export interface DatePickerProps {
  label: string;

  min?: string;

  /** @default false */
  required?: boolean;

  /** @default false */
  disabled?: boolean;
}

const DatePickerRender: ForwardRefRenderFunction<
  HTMLInputElement,
  DatePickerProps
> = ({ label, min, required = false, disabled = false }, ref) => (
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

export const DatePicker = forwardRef(DatePickerRender);
