import { type FC, type PropsWithChildren } from 'react';

import styles from './Dialog.module.css';

export type DialogContentProps = PropsWithChildren;

export const DialogContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={`${styles['dialog-content']} dialog-content`}>
      {children}
    </div>
  );
};
