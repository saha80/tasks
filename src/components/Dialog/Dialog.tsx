import {
  FC,
  MouseEventHandler,
  ReactEventHandler,
  ReactNode,
  RefCallback,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import { Form } from '@/components/Form/Form';

import styles from './Dialog.module.css';

export interface DialogProps {
  children: ReactNode;
  header?: ReactNode;
  onClose?: ReactEventHandler<HTMLDialogElement>;
  open?: boolean;
}

export const Dialog: FC<DialogProps> = forwardRef<
  HTMLDialogElement,
  DialogProps
>(({ header, children, open, onClose }, forwardedRef) => {
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

  return (
    <dialog
      className={`${styles.dialog} dialog`}
      ref={refCallback}
      onClick={onClick}
      onClose={onClose}
    >
      <div className={styles['dialog-inner']}>
        <div
          className={`${styles['dialog-header']} ${
            header ? '' : styles['dialog-without-header']
          } dialog-header`}
        >
          {header}
          <Form
            method="dialog"
            submitClassName={`${styles['close-button']}`}
            submitMessage={
              <span className={`${styles['close-icon']} material-icons`}>
                close
              </span>
            }
          >
            {null}
          </Form>
        </div>
        <hr className={styles['horizontal-line']} />
        <div className={`${styles['dialog-content']} dialog-content`}>
          {children}
        </div>
      </div>
    </dialog>
  );
});
