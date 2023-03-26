export type InputType =
  | 'text'
  | 'textarea'
  | 'email'
  | 'url'
  | 'date'
  | 'checkbox'
  | 'radio'
  | 'checkbox-group'
  | 'radio-group'
  | 'file'
  | 'select';

export interface FormInput {
  form?: string;
  name?: string;

  /** @default false */
  required?: boolean;

  /** @default false */
  disabled?: boolean;

  className: `input-inner-${InputType}`;
}
