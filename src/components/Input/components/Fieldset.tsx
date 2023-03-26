import { FC, ReactNode } from 'react';

import { FormInput, InputType } from './interfaces';
import { Label } from './Label';

export type FieldsetType = InputType & ('radio-group' | 'checkbox-group');

interface FieldsetProps extends FormInput {
  type: FieldsetType;
  className: `input-inner-${FieldsetType}`;
  legend: ReactNode;
  children: Array<string>;
}

export const Fieldset: FC<FieldsetProps> = ({
  type,
  legend,
  children,
  disabled = false,
  required = true,
  className,
  form,
  name,
}) => (
  <fieldset disabled={disabled} className="fieldset">
    <legend className="input-legend">{legend}</legend>
    {children.map((value, index) => (
      <div key={index} className="group">
        <input
          className={className}
          form={form}
          name={name}
          type={type === 'radio-group' ? 'radio' : 'checkbox'}
          value={value}
          required={required}
        />
        <Label htmlFor={value}>{value}</Label>
      </div>
    ))}
  </fieldset>
);
