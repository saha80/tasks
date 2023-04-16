import { FC } from 'react';

import { MdRotateRight } from 'react-icons/md';

import { Progress, ProgressProps } from '@/components/Progress/Progress';
import { Optional } from '@/utils/types';

import styles from './FetchingProgress.module.css';

export type FetchingProgressProps = Optional<ProgressProps, 'value' | 'max'>;

export const FetchingProgress: FC<FetchingProgressProps> = ({
  label,
  value,
  max,
  className = '',
}) =>
  typeof value == 'number' && typeof max == 'number' ? (
    <Progress label={label} value={value} max={max} className={className} />
  ) : (
    <div className={`${styles.progress} ${className}`}>
      {label}

      <MdRotateRight role="progressbar" className={styles.spinner} />
    </div>
  );
