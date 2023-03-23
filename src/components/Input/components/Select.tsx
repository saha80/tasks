import { Component } from 'react';
import { FormInput } from './interfaces';
import { Option } from './Option';

export interface SelectProps extends FormInput {
  children: Array<string>;
}

export class Select extends Component<SelectProps> {
  render() {
    const { children, multiple, ...selectProps } = this.props;

    return (
      <select multiple={multiple} {...selectProps}>
        {!multiple && <Option value="" selected={true} />}

        {children.map((option, index) => (
          <Option key={index} value={option} selected={false} />
        ))}
      </select>
    );
  }
}
