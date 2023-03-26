import { forwardRef } from 'react';
import { FormInput } from './interfaces';
import { Option } from './Option';

interface SelectProps extends FormInput {
  children: Array<string>;

  /** @default false */
  multiple?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, multiple = false, ...formProps }, ref) => (
    <select
      multiple={multiple}
      ref={ref}
      defaultValue={multiple ? [] : ''}
      {...formProps}
    >
      {!multiple && <Option defaultValue="" />}

      {children.map((option, index) => (
        <Option key={index} defaultValue={option} />
      ))}
    </select>
  )
);
