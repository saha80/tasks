import { Component } from 'react';

const valueToChildren = (value: string) => value;

export interface OptionProps {
  value: string;
  selected: boolean;
}

export class Option extends Component<OptionProps> {
  render() {
    const { ...optionProps } = this.props;

    return (
      <option {...optionProps} className="select-option">
        {valueToChildren(optionProps.value)}
      </option>
    );
  }
}
