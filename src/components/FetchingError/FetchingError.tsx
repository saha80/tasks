import { FC } from 'react';

import styles from './FetchingError.module.css';

export interface FetchingErrorProps {
  message?: string;
}

const defaultMessage = 'Error! Something bad happend!';

export const FetchingError: FC<FetchingErrorProps> = ({
  message = defaultMessage,
}) => <div className={styles.error}>{message}</div>;
