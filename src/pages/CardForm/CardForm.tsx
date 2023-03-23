import { Component, createRef } from 'react';

import { Form } from '@/components/Form/Form';
import { Input } from '@/components/Input/Input';

import './CardForm.css';

export class CardForm extends Component {
  fromRef = createRef<HTMLFormElement>();

  render() {
    const { fromRef } = this;
    const formId = 'card-form';
    return (
      <Form id={formId} name="card-form" fromRef={fromRef}>
        <Input
          id="text"
          label="text"
          title="text"
          name="text"
          type="text"
          form={formId}
          required={false}
          disabled={false}
        />
        <Input
          id="checkbox"
          label="checkbox"
          title="checkbox"
          name="checkbox"
          type="checkbox"
          form={formId}
          defaultChecked={false}
          required={false}
          disabled={false}
        />
        <Input
          id="radio"
          label="radio"
          title="radio"
          name="radio"
          type="radio"
          form={formId}
          defaultChecked={false}
          required={false}
          disabled={false}
        />
        <Input
          id="date"
          label="date"
          title="date"
          name="date"
          type="date"
          form={formId}
          required={false}
          disabled={false}
        />
        <Input
          id="file"
          label="file"
          title="file"
          name="file"
          type="file"
          accept="image"
          form={formId}
          required={false}
          multiple={true}
          disabled={false}
        />
        <Input
          id="select"
          label="select"
          title="select"
          name="select"
          type="select"
          form={formId}
          required={false}
          multiple={true}
          disabled={false}
          options={['1', '2', '3']}
        />
      </Form>
    );
  }
}
