import { FC } from 'react';

import { Progress, ProgressProps } from '@/components/Progress/Progress';
import { Optional } from '@/utils/types';

import styles from './FetchingProgress.module.css';

export type FetchingProgressProps = Optional<ProgressProps, 'value' | 'max'>;

export const FetchingProgress: FC<FetchingProgressProps> = ({
  label,
  value,
  max,
}) =>
  typeof value == 'number' && typeof max == 'number' ? (
    <Progress label={label} value={value} max={max} />
  ) : (
    <div>
      {label}

      <p role="progressbar" className={`${styles.spinner} material-icons`}>
        rotate_right
      </p>
    </div>
  );
