import { FC } from 'react';

import styles from './Error.module.css';

export interface ErrorProps {
  message?: string;
}

const defaultMessage = 'Error! Something bad happend!';

export const Error: FC<ErrorProps> = ({ message = defaultMessage }) => (
  <div className={styles.error} role="alert">
    {message}
  </div>
);
