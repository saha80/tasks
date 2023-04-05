import { forwardRef, ChangeEventHandler, FocusEventHandler } from 'react';

import { Label } from '@/components/Label/Label';

import './FilePicker.css';

export type AcceptType = 'audio' | 'video' | 'image';

export interface FilePickerProps {
  label: string;

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
    <div className="file-picker">
      <Label required={required}>
        {label}

        <input
          ref={ref}
          type="file"
          accept={`${accept}/*`}
          required={required}
          {...other}
        />
      </Label>
    </div>
  )
);
