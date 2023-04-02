import {
  forwardRef,
  ReactNode,
  ForwardRefRenderFunction,
  ChangeEventHandler,
  FocusEventHandler,
} from 'react';

import { Label } from '@/components/Label/Label';

import './Select.css';

export interface SelectProps {
  label: ReactNode;

  children: { label: ReactNode; value: string }[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  onBlur?: FocusEventHandler<HTMLSelectElement>;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  /** @default false */
  multiple?: boolean;
}

const SelectRender: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { children, label, required, multiple = false, ...other },
  ref
) => (
  <div className="select">
    <Label required={required}>
      {label}

      <select
        multiple={multiple}
        ref={ref}
        defaultValue={multiple ? [] : ''}
        required={required}
        {...other}
      >
        {!multiple && <option defaultValue="" />}

        {children.map(({ value, label }, index) => (
          <option defaultValue={value} key={index} className="select-option">
            {label}
          </option>
        ))}
      </select>
    </Label>
  </div>
);

export const Select = forwardRef(SelectRender);
