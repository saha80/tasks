import { FC } from 'react';

const valueToChildren = (value: string) => value;

export interface OptionProps {
  defaultValue: string;
}

export const Option: FC<OptionProps> = ({ defaultValue }) => (
  <option defaultValue={defaultValue} className="select-option">
    {valueToChildren(defaultValue)}
  </option>
);
