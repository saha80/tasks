import {
  FormEventHandler,
  FormHTMLAttributes,
  ReactNode,
  forwardRef,
} from 'react';

import { Button } from '@/components/Button/Button';

import styles from './Form.module.css';

export type Method = 'get' | 'post' | 'dialog';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  submitMessage: ReactNode;
  method: Method;
  submitClassName?: string;
  className?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    { id, children, submitMessage, submitClassName, className = '', ...other },
    ref
  ) => (
    <form
      className={`${styles.form} form ${className}`}
      autoComplete="on"
      id={id}
      ref={ref}
      {...other}
    >
      <div className="form-content">{children}</div>
      <Button type="submit" form={id} className={submitClassName}>
        {submitMessage}
      </Button>
    </form>
  )
);
