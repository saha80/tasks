/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable react/destructuring-assignment */
import { Component, createRef, FormEvent } from 'react';

import { Form } from '@/components/Form/Form';
import { Input } from '@/components/Input/Input';
import { CardProps } from '@/components/Card/Card';
import { CardVisibilityType } from '@/interfaces/Card';
import { toDateInputMinFormat } from '@/utils/date';

import { TextArea } from '@/components/TextArea/TextArea';
import { FilePicker } from '@/components/FilePicker/FilePicker';
import { Select } from '@/components/Select/Select';
import { RadioGroup } from '@/components/RadioGroup/RadioGroup';
import { DatePicker } from '@/components/DatePicker/DatePicker';
import { CheckBox } from '@/components/CheckBox/CheckBox';

import './CardForm.css';

const form = 'card-form';

export interface CardFormProps {
  onSubmit: (card: Omit<CardProps, 'id'>) => void;
}

interface CardFormState {
  title: string | undefined;
  description: string | undefined;
  createdBy: string | undefined;
  imgUrl: string | undefined;
  topics: string | undefined;
  tags: string | undefined;
  visibility: string | undefined; // enum
  creationDate: string | undefined;
  allowProcessData: string | undefined;
}

const initCardFormState: CardFormState = {
  title: undefined,
  description: undefined,
  createdBy: undefined,
  imgUrl: undefined,
  topics: undefined,
  tags: undefined,
  visibility: undefined,
  creationDate: undefined,
  allowProcessData: undefined,
};

export class CardForm extends Component<CardFormProps, CardFormState> {
  formRef = createRef<HTMLFormElement>();

  title = createRef<HTMLInputElement>();
  description = createRef<HTMLTextAreaElement>();
  createdBy = createRef<HTMLInputElement>();
  imgFile = createRef<HTMLInputElement>();
  topics = createRef<HTMLSelectElement>();
  tags = createRef<HTMLInputElement>();
  visibility = createRef<HTMLInputElement>();
  creationDate = createRef<HTMLInputElement>();
  allowProcessData = createRef<HTMLInputElement>();

  state = initCardFormState;

  onError = () => {
    const createdBy = this.createdBy.current?.validationMessage;
    this.setState({
      title: this.title.current?.validationMessage,
      description: this.description.current?.validationMessage,
      createdBy: createdBy
        ? `${createdBy} Examples: John Doe, Jane Doe.` // todo: add i18n
        : undefined,
      imgUrl: this.imgFile.current?.validationMessage,
      topics: this.topics.current?.validationMessage,
      tags: this.tags.current?.validationMessage,
      visibility: this.visibility.current?.validationMessage,
      creationDate: this.creationDate.current?.validationMessage,
      allowProcessData: this.allowProcessData.current?.validationMessage,
    });
  };

  onLoad = (event: ProgressEvent<FileReader>) => {
    const creationTimestamp =
      this.creationDate.current?.valueAsNumber || Date.now();

    this.props.onSubmit({
      title: this.title.current?.value || '',
      description: this.description.current?.value || '',
      createdBy: this.createdBy.current?.value.trim() || '',
      src: (event.target?.result as string) || '',
      topics: [this.topics.current?.value || ''],
      tags: (this.tags.current?.value || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean), // move to separate method
      visibility:
        (this.visibility.current?.value as CardVisibilityType | undefined) ||
        CardVisibilityType.ONLY_YOU,
      creationTimestamp,
      modificationTimestamp: creationTimestamp,
      likes: 0,
      views: 0,
    });
    this.setState(initCardFormState);
    this.formRef.current?.reset();
  };

  onSuccess = () => {
    const [imgFile] = this.imgFile.current?.files as FileList;
    const fr = new FileReader();
    fr.onload = (event) => {
      if (window.confirm('Add card?')) {
        this.onLoad(event);
      }
    };
    fr.readAsDataURL(imgFile);
  };

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!this.formRef.current?.reportValidity()) {
      this.onError();
    } else {
      this.onSuccess();
    }
  };

  render() {
    return (
      <div className="card-form">
        <Form
          fromRef={this.formRef}
          onSubmit={this.onSubmit}
          noValidate={true}
          id={form}
          name="card-form"
        >
          <Input type="text" label="Enter title:" required ref={this.title} />
          <div className="validation-message">{this.state.title}</div>

          <TextArea label="Enter description:" ref={this.description} />
          <div className="validation-message">{this.state.description}</div>

          <Input
            type="text"
            label={
              <span>
                Enter Your name.
                <br />
                It will be on created card:
              </span>
            }
            required
            pattern="([A-Z][a-z]+\s?){2}"
            ref={this.createdBy}
          />
          <div className="validation-message">{this.state.createdBy}</div>

          <FilePicker
            label="Upload image file:"
            required
            accept="image"
            ref={this.imgFile}
          />
          <div className="validation-message">{this.state.imgUrl}</div>

          <Select label="Select topic:" required ref={this.topics}>
            {[
              { value: 'programming', label: 'Programming' },
              { value: 'travelling', label: 'Travelling' },
            ]}
          </Select>
          <div className="validation-message">{this.state.topics}</div>

          <Input
            type="text"
            label={
              <span>
                Enter tags,
                <br />
                separate using comma:
              </span>
            }
            required
            pattern="(.+(, )?)+"
            ref={this.tags}
          />
          <div className="validation-message">{this.state.tags}</div>

          <RadioGroup
            legend="Choose visibility"
            name="visibility"
            ref={this.visibility}
          >
            {[
              { value: CardVisibilityType.ONLY_YOU, label: 'Only for You' },
              { value: CardVisibilityType.PUBLIC, label: 'Public' },
            ]}
          </RadioGroup>
          <div className="validation-message">{this.state.visibility}</div>

          <DatePicker
            label="Pick publication date:"
            required
            min={toDateInputMinFormat(new Date())}
            ref={this.creationDate}
          />
          <div className="validation-message">{this.state.creationDate}</div>

          <CheckBox
            label="Allow process the data?"
            required
            defaultChecked
            ref={this.allowProcessData}
          />
          <div className="validation-message">
            {this.state.allowProcessData}
          </div>
        </Form>
      </div>
    );
  }
}
