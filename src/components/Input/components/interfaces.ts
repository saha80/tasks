export type InputType = 'text' | 'date' | 'checkbox' | 'radio' | 'file' | 'select';

export interface FormInput {
  form: string;
  name: string;
  /** when `id` is not provided `name` is used. */
  id?: string;
  title: string;
  required: boolean;
  disabled: boolean;
  multiple?: boolean;
  className: `input-inner-${InputType}`;
}
