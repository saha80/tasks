import {
  ReactNode,
  forwardRef,
  ForwardRefRenderFunction,
  ChangeEventHandler,
  FocusEventHandler,
} from 'react';

import { Label } from '@/components/Label/Label';

import './Input.css';

export type InputType =
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'url';

export interface InputProps {
  label: ReactNode;

  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name?: string;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
  /** @default 'text' */
  type?: InputType;
}

const InputRender: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, required, type = 'text', ...other },
  ref
) => (
  <Label required={required}>
    {label}

    <input ref={ref} type={type} required={required} {...other} />
  </Label>
);

export const Input = forwardRef<HTMLInputElement, InputProps>(InputRender);
