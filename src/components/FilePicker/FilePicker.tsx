import {
  forwardRef,
  ForwardRefRenderFunction,
  ChangeEventHandler,
  FocusEventHandler,
} from 'react';

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
  /** @default false */
  multiple?: boolean;

  /** @default 'image'  */
  accept?: AcceptType;
}

const FilePickerRender: ForwardRefRenderFunction<
  HTMLInputElement,
  FilePickerProps
> = (
  { label, required, multiple = false, accept = 'image', ...other },
  ref
) => (
  <div className="file-picker">
    <Label required={required}>
      {label}

      <input
        ref={ref}
        type="file"
        accept={`${accept}/*`}
        multiple={multiple}
        required={required}
        {...other}
      />
    </Label>
  </div>
);

export const FilePicker = forwardRef(FilePickerRender);
