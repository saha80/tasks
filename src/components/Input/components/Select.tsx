import { FC } from 'react';
import { FormInput } from './interfaces';
import { Option } from './Option';

export interface SelectProps extends FormInput {
  children: Array<string>;
  ref?: React.LegacyRef<HTMLSelectElement>;

  /** @default false */
  multiple?: boolean;
}

export const Select: FC<SelectProps> = ({
  children,
  ref,
  multiple,
  ...selectProps
}) => {
  return (
    <select multiple={multiple} ref={ref} defaultValue="" {...selectProps}>
      {!multiple && <Option defaultValue="" />}

      {children.map((option, index) => (
        <Option key={index} defaultValue={option} />
      ))}
    </select>
  );
};
