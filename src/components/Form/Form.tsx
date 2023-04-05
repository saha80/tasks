import { FormEventHandler, ReactNode, forwardRef } from 'react';

import './Form.css';

export interface FormProps {
  id: string;
  children: ReactNode;
  name: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  noValidate?: boolean;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ id, children, ...other }, ref) => (
    <form
      className="form"
      autoComplete="on"
      method="dialog"
      id={id}
      ref={ref}
      {...other}
    >
      <div className="form-content">{children}</div>
      <button type="submit" form={id}>
        Submit
      </button>
    </form>
  )
);
