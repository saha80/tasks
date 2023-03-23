import { Component, ReactElement, RefObject } from 'react';

import './Form.css';

export interface FormProps {
  id: string;
  name: string;
  fromRef: RefObject<HTMLFormElement>;
  children: ReactElement | Array<ReactElement>;
}

export class Form extends Component<FormProps> {
  render() {
    const { id, name, fromRef, children } = this.props;

    return (
      <form
        className="form"
        autoComplete="on"
        noValidate={false}
        method="dialog"
        id={id}
        ref={fromRef}
        name={name}
      >
        <div className="form-content">{children}</div>
        <button type="submit" form={id}>
          Submit
        </button>
      </form>
    );
  }
}
