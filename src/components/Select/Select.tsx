import { forwardRef, ReactNode, ForwardRefRenderFunction } from 'react';

import './Select.css';

export interface SelectProps {
  children: { label: ReactNode; value: string }[]; // todo: extract to separate type

  label: ReactNode;

  /** @default false */
  required?: boolean;

  /** @default false */
  disabled?: boolean;

  /** @default false */
  multiple?: boolean;
}

const SelectRender: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { children, label, required = false, disabled = false, multiple = false },
  ref
) => (
  <div className="select">
    <label className="label">
      {label}

      <select
        multiple={multiple}
        ref={ref}
        defaultValue={multiple ? [] : ''}
        required={required}
        disabled={disabled}
      >
        {!multiple && <option defaultValue="" />}

        {children.map(({ value, label }, index) => (
          <option defaultValue={value} key={index} className="select-option">
            {label}
          </option>
        ))}
      </select>
    </label>
  </div>
);

export const Select = forwardRef(SelectRender);
