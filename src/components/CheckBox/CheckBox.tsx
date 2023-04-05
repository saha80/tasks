import { forwardRef, ChangeEventHandler, FocusEventHandler } from 'react';

import { Label } from '@/components/Label/Label';

import './CheckBox.css';

export interface CheckBoxProps {
  label: string;

  required?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  name?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ label, required, ...other }, ref) => (
    <div className="checkbox">
      <Label required={required}>
        {label}

        <input ref={ref} type="checkbox" required={required} {...other} />
      </Label>
    </div>
  )
);
