import { Component } from 'react';

import { Select } from './components/Select';
import { FormInput, InputType } from './components/interfaces';

import './Input.css';

export type AcceptType = 'audio' | 'video' | 'image';

export type { InputType };

export interface InputProps extends Omit<FormInput, 'className'> {
  type: InputType;
  label: string;

  /** @required when `type`: 'checkbox' | 'radio' */
  defaultChecked?: boolean;

  /** @required when `type`: 'file' */
  accept?: AcceptType;

  /** @required when `type`: 'file' | 'select' */
  multiple?: boolean;

  /** @required when `type`: 'select' */
  options?: Array<string>;
}

export class Input extends Component<InputProps> {
  render() {
    const {
      type,
      label,
      id: providedId,
      name,
      defaultChecked: checked,
      accept = 'image',
      options,
      multiple,
      ...otherProps
    } = this.props;

    const id = providedId || name;

    const isMultiple = type === 'file' || type === 'select' ? multiple!.valueOf() : undefined;

    const formInput: FormInput = {
      name,
      id,
      multiple: isMultiple,
      className: `input-inner-${type}`,
      ...otherProps,
    };

    const defaultChecked = type === 'checkbox' || type === 'radio' ? checked!.valueOf() : undefined;

    const acceptType = type === 'file' ? `${accept!.valueOf()}/*` : undefined;

    return (
      <div className="input">
        <label className="input-label" htmlFor={id}>
          {label}
        </label>
        {type === 'select' ? (
          <Select {...formInput}>{options!.filter((option) => Boolean(option))}</Select>
        ) : (
          <input type={type} defaultChecked={defaultChecked} accept={acceptType} {...formInput} />
        )}
      </div>
    );
  }
}
