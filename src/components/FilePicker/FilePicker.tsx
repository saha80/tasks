import { forwardRef } from 'react';

import './FilePicker.css';

export type AcceptType = 'audio' | 'video' | 'image';

export interface FilePickerProps {
  label: string;

  /** @default false */
  required?: boolean;

  /** @default false */
  multiple?: boolean;

  /** @default 'image'  */
  accept?: AcceptType;
}

export const FilePicker = forwardRef<HTMLInputElement, FilePickerProps>(
  ({ label, required, multiple, accept }, ref) => (
    <div className="file-picker">
      <label className="label">
        {label}

        <input
          ref={ref}
          type="file"
          accept={accept}
          multiple={multiple}
          required={required}
        />
      </label>
    </div>
  )
);
