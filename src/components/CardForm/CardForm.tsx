import { Component, createRef } from 'react';

import { Form } from '@/components/Form/Form';
import { Input } from '@/components/Input/Input';
import { CardProps } from '@/components/Card/Card';

import './CardForm.css';

const form = 'card-form';

export interface CardFormProps {
  onSubmit: (card: CardProps) => void;
}

export class CardForm extends Component<CardFormProps> {
  title = createRef<Input>();
  description = createRef<Input>();
  createdBy = createRef<Input>();
  imgUrl = createRef<Input>();
  topics = createRef<Input>();
  tags = createRef<Input>();
  visibility = createRef<Input>();
  creationDate = createRef<Input>();

  render() {
    const { onSubmit } = this.props;

    return (
      <div className="card-form">
        <Form
          onSubmit={(event) => {
            this.title.current;
            this.description.current;
            this.createdBy.current;
            this.imgUrl.current;
            this.topics.current;
            this.tags.current;
            this.visibility.current;
            this.creationDate.current;
            onSubmit;
          }}
          id={form}
          name="card-form"
        >
          <Input type="text" label="Title" required ref={this.title} />
          <Input type="textarea" label="Description" ref={this.description} />
          <Input
            type="email"
            label="Created By"
            required
            ref={this.createdBy}
          />
          <Input type="url" label="Card image url" required ref={this.imgUrl} />
          <Input
            type="select"
            label="Select topics"
            values={['programming', 'travelling']}
            required
            ref={this.topics}
          />
          <Input
            type="text"
            label={
              <span>
                Enter tags.
                <br />
                Separate them using comma.
              </span>
            }
            pattern="(.+,?)+"
            required
            ref={this.tags}
          />
          <Input
            type="radio-group"
            label="Choose visibility"
            values={['only-you', 'you-and-friends', 'public']}
            name="visibility"
            required
            ref={this.visibility}
          />
          <Input
            type="date"
            label="Enter publication date"
            required
            ref={this.creationDate}
          />
        </Form>
      </div>
    );
  }
}
