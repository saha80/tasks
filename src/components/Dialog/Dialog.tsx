import {
  FC,
  MouseEventHandler,
  ReactEventHandler,
  RefCallback,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  ReactComponentElement,
} from 'react';

import { MdClose } from 'react-icons/md';

import { Button } from '@/components/Button/Button';

import { DialogTitle, DialogTitleProps } from './DialogTitle';
import { DialogContent, DialogContentProps } from './DialogContent';

import styles from './Dialog.module.css';

export interface DialogProps {
  children: [
    ReactComponentElement<typeof DialogTitle, DialogTitleProps>,
    ReactComponentElement<typeof DialogContent, DialogContentProps>
  ];
  onClose?: ReactEventHandler<HTMLDialogElement>;
  open?: boolean;
}

export const Dialog: FC<DialogProps> = forwardRef<
  HTMLDialogElement,
  DialogProps
>(({ children, open, onClose }, forwardedRef) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const refCallback: RefCallback<HTMLDialogElement> = useCallback(
    (instance) => {
      if (typeof forwardedRef === 'function') {
        forwardedRef(instance);
      }
      if (typeof forwardedRef === 'object' && forwardedRef) {
        forwardedRef.current = instance;
      }
      dialogRef.current = instance;
    },
    [forwardedRef]
  );

  useEffect(() => {
    if (open && !dialogRef.current?.open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  const onClick: MouseEventHandler<HTMLDialogElement> = useCallback((event) => {
    if (event.target === dialogRef.current) {
      dialogRef.current.close();
    }
  }, []);

  const onCloseButtonClick = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const [title, ...otherChildren] = children;

  return (
    <dialog
      className={`${styles.dialog} dialog`}
      ref={refCallback}
      onClick={onClick}
      onClose={onClose}
    >
      <div className={styles['dialog-inner']}>
        <div className={`${styles['dialog-header']} dialog-header`}>
          {title}
          <Button
            type="button"
            onClick={onCloseButtonClick}
            className={`${styles['close-button']}`}
          >
            <MdClose className={styles['close-icon']} />
          </Button>
        </div>
        <hr className={styles['horizontal-line']} />
        <div className={`${styles['dialog-content']} dialog-content`}>
          {otherChildren}
        </div>
      </div>
    </dialog>
  );
});
