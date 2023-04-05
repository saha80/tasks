import {
  forwardRef,
  ReactNode,
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

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, required, ...other }, ref) => (
    <div className="textarea">
      <Label required={required}>
        {label}

        <textarea ref={ref} required={required} {...other} />
      </Label>
    </div>
  )
);
