import { FC, ReactElement, ReactNode } from 'react';

import styles from './Label.module.css';

export interface LabelProps {
  required?: boolean;
  children: [
    ReactNode,
    (
      | ReactElement<HTMLInputElement>
      | ReactElement<HTMLSelectElement>
      | ReactElement<HTMLTextAreaElement>
      | ReactElement<HTMLProgressElement>
    )
  ];
}

export const Label: FC<LabelProps> = ({
  required,
  children: [label, input],
}) => (
  <label className={`${styles.label} label`}>
    {label} {required ? <span className={styles.required}>*</span> : null}
    <div className={styles.input}>{input}</div>
  </label>
);
