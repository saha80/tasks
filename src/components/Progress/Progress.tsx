import { type FC } from 'react';

import { MdRotateRight } from 'react-icons/md/index';

import styles from './Progress.module.css';

export interface ProgressProps {
  message?: string;
  className?: string;
}

const defaultMessage = 'Progressing...';

export const Progress: FC<ProgressProps> = ({
  message = defaultMessage,
  className = '',
}) => (
  <div role="progressbar" className={`${styles.progress} ${className}`}>
    {message}

    <MdRotateRight className={styles.spinner} />
  </div>
);
