import { forwardRef, ForwardRefRenderFunction } from 'react';

import './CheckBox.css';

export interface CheckBoxProps {
  label: string;

  /** @default false */
  required?: boolean;

  /** @default false */
  disabled?: boolean;

  /** @default false */
  defaultChecked?: boolean;
}

const CheckBoxRender: ForwardRefRenderFunction<
  HTMLInputElement,
  CheckBoxProps
> = (
  { label, required = false, disabled = false, defaultChecked = false },
  ref
) => (
  <div className="checkbox">
    <label className="label">
      {label}

      <input
        ref={ref}
        type="checkbox"
        required={required}
        disabled={disabled}
        defaultChecked={defaultChecked}
      />
    </label>
  </div>
);

export const CheckBox = forwardRef(CheckBoxRender);
