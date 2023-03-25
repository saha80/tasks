import { FC, FormEventHandler, ReactElement, RefObject } from 'react';

import './Form.css';

export interface FormProps {
  id: string;
  name: string;
  fromRef?: RefObject<HTMLFormElement>;
  children: ReactElement | Array<ReactElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const Form: FC<FormProps> = ({
  id,
  name,
  fromRef,
  onSubmit,
  children,
}) => (
  <form
    className="form"
    autoComplete="on"
    noValidate={false}
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
