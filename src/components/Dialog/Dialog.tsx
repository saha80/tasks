import { type FC, type ReactComponentElement } from 'react';
import { MdClose } from 'react-icons/md/index';

import { Button } from '@/components/Button/Button';

import { type DialogContent, type DialogContentProps } from './DialogContent';
import { type DialogTitle, type DialogTitleProps } from './DialogTitle';
import styles from './Dialog.module.css';

export interface DialogProps {
  children: [
    ReactComponentElement<typeof DialogTitle, DialogTitleProps>,
    ReactComponentElement<typeof DialogContent, DialogContentProps>
  ];
  onClose?: () => void;
  open?: boolean;
}

export const Dialog: FC<DialogProps> = ({ children, open, onClose }) => {
  const [dialogTitle, dialogContent] = children;

  if (!open) {
    return null;
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={`${styles.dialog} dialog`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={`${styles.header} dialog-header`}>
          {dialogTitle}
          <Button
            type="button"
            onClick={onClose}
            className={`${styles.closeButton}`}
          >
            <MdClose className={styles.closeIcon} />
          </Button>
        </div>
        <hr className={styles.horizontalLine} />
        <div className={`${styles.content} dialog-content`}>
          {dialogContent}
        </div>
      </div>
    </div>
  );
};
