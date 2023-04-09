import { ReactNode, forwardRef } from 'react';

import { Label } from '@/components/Label/Label';
import { clamp } from '@/utils/math';

import styles from './Progress.module.css';

export interface ProgressProps {
  label: ReactNode;
  value: number;
  max: number;
  className?: string;
}

export const Progress = forwardRef<HTMLProgressElement, ProgressProps>(
  ({ label, value, max, className = '' }, ref) => (
    <Label>
      {label}

      <progress
        ref={ref}
        className={`${styles.progress} progress ${className}`}
        max={max}
        value={clamp(value, 0, max)}
      >
        {label}
      </progress>
    </Label>
  )
);
