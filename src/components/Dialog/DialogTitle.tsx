import { FC, PropsWithChildren } from 'react';

import styles from './DialogTitle.module.css';

export interface DialogTitleProps extends PropsWithChildren {
  className?: string;
}

export const DialogTitle: FC<DialogTitleProps> = ({
  children,
  className = '',
}) => <div className={`${styles.title} ${className}`}>{children}</div>;
