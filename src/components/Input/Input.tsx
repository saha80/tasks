import { ReactNode, forwardRef, ForwardedRef } from 'react';

import { Label } from './components/Label';
import { Select } from './components/Select';
import { RadioGroup } from './components/RadioGroup';
import { FormInput, InputType } from './components/interfaces';

import './Input.css';

export type AcceptType = 'audio' | 'video' | 'image';

export type { InputType };

export interface InputProps extends Omit<FormInput, 'className'> {
  type: InputType;
  label: ReactNode;
  pattern?: string;

  min?: string | number;

  /** @default false @required when `type`: 'checkbox' | 'radio' */
  defaultChecked?: boolean;

  /** @default 'image' @required when `type`: 'file' */
  accept?: AcceptType;

  /** @default false @required when `type`: 'file' | 'select' | 'email' */
  multiple?: boolean;

  /** @required when `type`: 'select' */
  values?: Array<string>;
}

export const Input = forwardRef<
  HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      type,
      label,
      defaultChecked: checked = false,
      accept = 'image',
      multiple: isMultiple = false,
      values: providedValues,
      pattern,
      min,
      ...otherProps
    },
    ref
  ) => {
    const formInput: FormInput = {
      ...otherProps,
      className: `input-inner-${type}`,
    };

    if (type === 'radio-group') {
      return (
        <RadioGroup
          {...formInput}
          legend={label}
          ref={ref as ForwardedRef<HTMLInputElement>}
        >
          {Array.from(providedValues!).filter(Boolean)}
        </RadioGroup>
      );
    }

    const multiple =
      type === 'file' || type === 'select' || type === 'email'
        ? isMultiple!.valueOf()
        : undefined;

    const defaultChecked =
      type === 'checkbox' || type === 'radio' ? checked!.valueOf() : undefined;

    const acceptType = type === 'file' ? `${accept!.valueOf()}/*` : undefined;

    return (
      <div className="input">
        <Label>
          {label}

          {type === 'select' ? (
            <Select
              ref={ref as ForwardedRef<HTMLSelectElement>}
              {...formInput}
              multiple={multiple}
            >
              {Array.from(providedValues!).filter(Boolean)}
            </Select>
          ) : type === 'textarea' ? (
            <textarea
              ref={ref as ForwardedRef<HTMLTextAreaElement>}
              {...formInput}
            />
          ) : (
            <input
              {...formInput}
              ref={ref as ForwardedRef<HTMLInputElement>}
              type={type}
              defaultChecked={defaultChecked}
              accept={acceptType}
              multiple={multiple}
              pattern={pattern}
              min={min}
            />
          )}
        </Label>
      </div>
    );
  }
);
