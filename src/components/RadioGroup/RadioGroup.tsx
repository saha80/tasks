import { type ReactNode, forwardRef } from 'react';

import styles from './RadioGroup.module.css';

export interface RadioGroupProps {
  legend: ReactNode;
  disabled?: boolean;

  name: string;
  children: { label: ReactNode; value: string }[];
}

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ legend, name, children, disabled = false }, ref) => (
    <fieldset disabled={disabled} className={styles.radiogroup}>
      <legend className="legend">{legend}</legend>

      {children.map(({ value, label }, index) => (
        <label key={value} className={styles.label}>
          <input
            className={styles.radio}
            type="radio"
            ref={ref}
            name={name}
            value={value}
            defaultChecked={index === 0}
            required
          />

          {label}
        </label>
      ))}
    </fieldset>
  )
);
