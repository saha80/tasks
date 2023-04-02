import { ReactNode, forwardRef, ForwardRefRenderFunction } from 'react';

import { Radio } from '@/components/Radio/Radio';

import './RadioGroup.css';

export interface RadioGroupProps {
  legend: ReactNode;
  name: string;

  children: { label: ReactNode; value: string }[];

  /** @default false */
  disabled?: boolean;
}

const RadioGroupRender: ForwardRefRenderFunction<
  HTMLInputElement,
  RadioGroupProps
> = ({ legend, name, children, disabled = false }, ref) => (
  <fieldset disabled={disabled} className="radiogroup">
    <legend className="legend">{legend}</legend>

    {children.map(({ value, label }, index) => (
      <Radio
        key={index}
        name={name}
        value={value}
        defaultChecked={index === 0}
        required
        ref={ref}
        label={label}
      />
    ))}
  </fieldset>
);

export const RadioGroup = forwardRef(RadioGroupRender);
