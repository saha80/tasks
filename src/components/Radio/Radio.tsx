import { forwardRef, ReactNode } from 'react';

export interface RadioProps {
  label: ReactNode;

  name: string;
  value: string;
  required?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, ...other }, ref) => (
    <label className="label">
      <input type="radio" ref={ref} {...other} />

      {label}
    </label>
  )
);
