import { forwardRef, ReactNode, ForwardRefRenderFunction } from 'react';

interface RadioProps {
  label: ReactNode;

  name: string;
  value: string;
  required?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
}

const RadioRender: ForwardRefRenderFunction<HTMLInputElement, RadioProps> = (
  { label, ...other },
  ref
) => (
  <label className="label">
    <input type="radio" ref={ref} {...other} />

    {label}
  </label>
);

export const Radio = forwardRef(RadioRender);
