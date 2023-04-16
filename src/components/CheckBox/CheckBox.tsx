import {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  ReactNode,
} from 'react';

import { Label } from '@/components/Label/Label';

export interface CheckBoxProps {
  label: ReactNode;

  required?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  name?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ label, required, ...other }, ref) => (
    <Label required={required}>
      {label}

      <input
        ref={ref}
        type="checkbox"
        className="checkbox"
        required={required}
        {...other}
      />
    </Label>
  )
);
