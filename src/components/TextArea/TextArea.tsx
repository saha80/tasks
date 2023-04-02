import {
  forwardRef,
  ReactNode,
  ForwardRefRenderFunction,
  ChangeEventHandler,
  FocusEventHandler,
} from 'react';

import { Label } from '@/components/Label/Label';

import './TextArea.css';

export interface TextAreaProps {
  label: ReactNode;

  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  name?: string;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  disabled?: boolean;
}

const TextAreaRender: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextAreaProps
> = ({ label, required, ...other }, ref) => (
  <div className="textarea">
    <Label required={required}>
      {label}

      <textarea ref={ref} required={required} {...other} />
    </Label>
  </div>
);

export const TextArea = forwardRef(TextAreaRender);
