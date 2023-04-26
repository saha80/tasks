import { forwardRef, ReactNode } from 'react';

interface RadioProps {
  children: Array<string>;

  label: ReactNode;

  /** @default false */
  required?: boolean;

  /** @default false */
  disabled?: boolean;

  /** @default false */
  defaultChecked?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    { label, required = false, disabled = false, defaultChecked = false },
    ref
  ) => (
    <div className="radio">
      <label className="label">
        {label}

        <input
          type="radio"
          ref={ref}
          required={required}
          disabled={disabled}
          defaultChecked={defaultChecked}
        />
      </label>
    </div>
  )
);
