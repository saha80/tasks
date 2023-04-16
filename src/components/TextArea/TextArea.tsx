import {
  ChangeEventHandler,
  FocusEventHandler,
  ReactNode,
  forwardRef,
} from 'react';

import { Label } from '@/components/Label/Label';

import styles from './TextArea.module.css';

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
    <Label required={required}>
      {label}

      <textarea
        ref={ref}
        required={required}
        className={`${styles.textarea} textarea`}
        {...other}
      />
    </Label>
  )
);
