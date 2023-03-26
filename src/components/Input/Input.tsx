import { ReactNode, forwardRef } from 'react';

import { Label } from './components/Label';
import { Select } from './components/Select';
import { Fieldset } from './components/Fieldset';
import { FormInput, InputType } from './components/interfaces';

import './Input.css';

export type AcceptType = 'audio' | 'video' | 'image';

export type { InputType };

export interface InputProps extends Omit<FormInput, 'className'> {
  type: InputType;
  label: ReactNode;
  pattern?: string;

  /** when `id` is not provided `name` is used. */
  id?: string;
  ref?:
    | React.LegacyRef<HTMLSelectElement>
    | React.LegacyRef<HTMLInputElement>
    | React.LegacyRef<HTMLTextAreaElement>;

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
  React.HTMLProps<HTMLButtonElement> & InputProps
>((props, ref) => {
  const {
    type,
    label,
    id,
    name,
    defaultChecked: checked = false,
    accept = 'image',
    multiple: isMultiple = false,
    values: providedValues,
    form,
    disabled,
    pattern,
    required,
    // children,
  } = props;

  const formInput: FormInput = {
    name,
    className: `input-inner-${type}`,
    form,
    disabled,
    required,
  };

  if (type === 'radio-group' || type === 'checkbox-group') {
    return (
      <Fieldset
        {...formInput}
        legend={label}
        type={type}
        className={`input-inner-${type}`}
      >
        {Array.from(providedValues!).filter(Boolean)}
      </Fieldset>
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
      <Label htmlFor={id}>{label}</Label>
      {type === 'select' ? (
        <Select ref={ref} {...formInput} multiple={multiple}>
          {Array.from(providedValues!).filter(Boolean)}
        </Select>
      ) : type === 'textarea' ? (
        <textarea
          ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
          {...formInput}
          id={id}
        />
      ) : (
        <input
          {...formInput}
          ref={ref as React.ForwardedRef<HTMLInputElement>}
          id={id}
          type={type}
          defaultChecked={defaultChecked}
          accept={acceptType}
          multiple={multiple}
          pattern={pattern}
        />
      )}
    </div>
  );
});

// todo: remove unused code

// export type NamedInputPropsRecord<Name extends string> = Record<
//   Name,
//   Omit<InputProps, 'name'> | undefined
// >;

// export const createNamedInputs = <Name extends string>(
//   record: NamedInputPropsRecord<Name>
// ) => (
//   <>
//     {Object.entries(record)
//       .filter(([, value]) => value && typeof value === 'object')
//       .map(([key, value]) => (
//         <Input
//           key={key}
//           name={key}
//           {...(value as Omit<InputProps, 'name'>)}
//         ></Input>
//       ))}
//   </>
// );
