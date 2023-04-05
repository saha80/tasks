import { ReactNode, forwardRef } from 'react';

import { Radio } from '@/components/Radio/Radio';

import './RadioGroup.css';

export interface RadioGroupProps {
  legend: ReactNode;
  disabled?: boolean;

  name: string;
  children: { label: ReactNode; value: string }[];
}

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ legend, name, children, disabled = false }, ref) => (
    <fieldset disabled={disabled} className="radiogroup">
      <legend className="legend">{legend}</legend>

      {children.map(({ value, label }, index) => (
        <Radio
          key={value}
          name={name}
          value={value}
          defaultChecked={index === 0}
          required
          ref={ref}
          label={label}
        />
      ))}
    </fieldset>
  )
);
