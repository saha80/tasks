import { forwardRef, ReactNode } from 'react';

import './TextArea.css';

export interface TextAreaProps {
  label: ReactNode;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label }, ref) => (
    <div className="textarea">
      <label className="label">
        {label}

        <textarea ref={ref} />
      </label>
    </div>
  )
);
