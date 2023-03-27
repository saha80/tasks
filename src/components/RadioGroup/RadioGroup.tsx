import { ReactNode, forwardRef } from 'react';

import './RadioGroup.css';

export interface RadioGroupProps {
  legend: ReactNode;
  name: string;

  /** @default false */
  disabled?: boolean;

  children: Array<{ label: ReactNode; value: string }>;
}

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ legend, name, children, disabled = false }, ref) => (
    <fieldset disabled={disabled} className="radiogroup">
      <legend className="legend">{legend}</legend>
      {children.map(({ value, label }, index) => (
        <label className="label" key={index}>
          <input name={name} type="radio" value={value} required ref={ref} />

          {label}
        </label>
      ))}
    </fieldset>
  )
);
