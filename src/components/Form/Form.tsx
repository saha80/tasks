import { FC, FormEventHandler, ReactNode, RefObject } from 'react';

import './Form.css';

export interface FormProps {
  id: string;
  name: string;
  fromRef?: RefObject<HTMLFormElement>;
  /** @default false */
  noValidate?: boolean;
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const Form: FC<FormProps> = ({
  id,
  name,
  fromRef,
  onSubmit,
  children,
  noValidate = false,
}) => (
  <form
    className="form"
    autoComplete="on"
    noValidate={noValidate}
    method="dialog"
    id={id}
    ref={fromRef}
    name={name}
    onSubmit={onSubmit}
  >
    <div className="form-content">{children}</div>
    <button type="submit" form={id}>
      Submit
    </button>
  </form>
);
