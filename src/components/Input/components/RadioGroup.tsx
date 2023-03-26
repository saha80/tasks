import { ReactNode, forwardRef } from 'react';

import { FormInput } from './interfaces';
import { Label } from './Label';

interface RadioGroupProps extends FormInput {
  legend: ReactNode;
  children: Array<string>;
}

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ legend, children, disabled = false, className, form, name }, ref) => (
    <fieldset disabled={disabled} className="fieldset">
      <legend className="input-legend">{legend}</legend>
      {children.map((value, index) => (
        <Label key={index}>
          {
            <input
              className={className}
              form={form}
              name={name}
              type="radio"
              value={value}
              required
              ref={ref}
            />
          }
          {value}
        </Label>
      ))}
    </fieldset>
  )
);
