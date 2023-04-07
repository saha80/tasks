import { FC } from 'react';

import styles from './ValidationMessage.module.css';

interface FieldError {
  message?: string;
}

export interface ValidationMessageProps {
  fieldError: FieldError | undefined;
  children?: string;
}

export const ValidationMessage: FC<ValidationMessageProps> = ({
  fieldError: { message } = {},
  children,
}) =>
  message ? (
    <div className={`${styles['validation-message']} validation-message`}>
      {message} {children}
    </div>
  ) : null;
