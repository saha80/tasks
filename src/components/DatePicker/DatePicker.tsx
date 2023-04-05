import { forwardRef, ChangeEventHandler, FocusEventHandler } from 'react';

import { Label } from '@/components/Label/Label';

import './DatePicker.css';

export interface DatePickerProps {
  label: string;

  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name?: string;
  min?: string | number;
  max?: string | number;
  required?: boolean;
  disabled?: boolean;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, required, ...other }, ref) => (
    <Label required={required}>
      {label}

      <input ref={ref} type="date" required={required} {...other} />
    </Label>
  )
);
