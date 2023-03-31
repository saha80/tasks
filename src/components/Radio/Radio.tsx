import { forwardRef, ReactNode, ForwardRefRenderFunction } from 'react';

interface RadioProps {
  label: ReactNode;

  /** @default false */
  required?: boolean;

  /** @default false */
  disabled?: boolean;

  /** @default false */
  defaultChecked?: boolean;
}

const RadioRender: ForwardRefRenderFunction<HTMLInputElement, RadioProps> = (
  { label, required = false, disabled = false, defaultChecked = false },
  ref
) => (
  <div className="radio">
    <label className="label">
      <input
        type="radio"
        ref={ref}
        required={required}
        disabled={disabled}
        defaultChecked={defaultChecked}
      />

      {label}
    </label>
  </div>
);

export const Radio = forwardRef(RadioRender);
