import { Component, createRef, FormEvent } from 'react';

import { Form } from '@/components/Form/Form';
import { Input } from '@/components/Input/Input';
import { CardProps } from '@/components/Card/Card';
import { CardVisibilityType } from '@/interfaces/Card';
import { toDateInputMinFormat } from '@/utils/date';

import './CardForm.css';

const form = 'card-form';

const visibilityName: Record<CardVisibilityType, string> = {
  'only-you': 'Only for You',
  public: 'Public',
};

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
  visibility: string | undefined;
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
      this.creationDate.current?.valueAsNumber ?? Date.now();

    const mapToVisibility = (name: string | undefined): CardVisibilityType => {
      const entry = Object.entries(visibilityName).find(
        ([, value]) => value === name
      );
      return entry?.[0] as CardVisibilityType;
    };

    this.props.onSubmit({
      title: this.title.current?.value ?? '',
      description: this.description.current?.value ?? '',
      createdBy: this.createdBy.current?.value.trim() ?? '',
      src: (event.target?.result as string) ?? '',
      topics: [this.topics.current?.value ?? ''],
      tags: (this.tags.current?.value ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      visibility: mapToVisibility(this.visibility.current?.value) ?? 'only-you',
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
          <div className="red">{this.state.title}</div>

          <Input
            type="textarea"
            label="Enter description:"
            ref={this.description}
          />
          <div className="red">{this.state.description}</div>

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
          <div className="red">{this.state.createdBy}</div>

          <Input
            type="file"
            label="Upload image file:"
            required
            accept="image"
            ref={this.imgFile}
          />
          <div className="red">{this.state.imgUrl}</div>

          <Input
            type="select"
            label="Select topic:"
            values={['programming', 'travelling']}
            required
            ref={this.topics}
          />
          <div className="red">{this.state.topics}</div>

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
          <div className="red">{this.state.tags}</div>

          <Input
            type="radio-group"
            label="Choose visibility"
            values={[visibilityName['only-you'], visibilityName['public']]}
            name="visibility"
            ref={this.visibility}
          />
          <div className="red">{this.state.visibility}</div>

          <Input
            type="date"
            label="Pick publication date:"
            required
            min={toDateInputMinFormat(new Date())}
            ref={this.creationDate}
          />
          <div className="red">{this.state.creationDate}</div>

          <Input
            type="checkbox"
            label="Allow process the data?"
            required
            defaultChecked
            min={toDateInputMinFormat(new Date())}
            ref={this.allowProcessData}
          />
          <div className="red">{this.state.allowProcessData}</div>
        </Form>
      </div>
    );
  }
}
