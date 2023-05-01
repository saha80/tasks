import {
  forwardRef,
  type ChangeEventHandler,
  type FocusEventHandler,
  type ReactNode,
} from 'react';

import { Label } from '@/components/Label/Label';

import styles from './FilePicker.module.css';

export type AcceptType = 'audio' | 'video' | 'image';

export interface FilePickerProps {
  label: ReactNode;

  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  /** @default 'image'  */
  accept?: AcceptType;
}

export const FilePicker = forwardRef<HTMLInputElement, FilePickerProps>(
  ({ label, required, accept = 'image', ...other }, ref) => (
    <Label required={required}>
      {label}

      <input
        ref={ref}
        type="file"
        accept={`${accept}/*`}
        className={`${styles.filePicker} file-picker`}
        required={required}
        {...other}
      />
    </Label>
  )
);
