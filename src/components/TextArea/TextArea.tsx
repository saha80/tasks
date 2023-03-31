import { forwardRef, ReactNode, ForwardRefRenderFunction } from 'react';

import './TextArea.css';

export interface TextAreaProps {
  label: ReactNode;
}

const TextAreaRender: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextAreaProps
> = ({ label }, ref) => (
  <div className="textarea">
    <label className="label">
      {label}

      <textarea ref={ref} />
    </label>
  </div>
);

export const TextArea = forwardRef(TextAreaRender);
