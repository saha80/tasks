import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import {
  CardProps,
  CheckBox,
  DatePicker,
  FilePicker,
  Form,
  Input,
  RadioGroup,
  Select,
  TextArea,
  ValidationMessage,
} from '@/components';
import { CardVisibilityType } from '@/interfaces/Card';
import { toDateInputMinFormat } from '@/utils/date';
import { readAsDataURL } from '@/utils/readAsDataURL';

import styles from './CardForm.module.css';

export interface CardFormProps {
  onSubmit: (card: Omit<CardProps, 'id'>) => void;
}

interface CardFieldValues {
  title: string;
  description: string;
  createdBy: string;
  imgUrl: FileList;
  topics: string;
  tags: string;
  visibility: CardVisibilityType;
  creationDate: number;
  allowProcessData: boolean;
}

export const CardForm: FC<CardFormProps> = ({ onSubmit }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CardFieldValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldUseNativeValidation: true,
  });

  const onSuccess = useCallback(
    async (data: CardFieldValues) => {
      const card: Omit<CardProps, 'id'> = {
        title: data.title,
        description: data.description,
        createdBy: data.createdBy.trim(),
        src: await readAsDataURL(data.imgUrl[0]),
        topics: [data.topics],
        tags: data.tags
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        visibility: data.visibility,
        creationTimestamp: data.creationDate,
        modificationTimestamp: data.creationDate,
        likes: 0,
        views: 0,
      };

      if (window.confirm('Add card?')) {
        onSubmit(card);
        reset();
      }
    },
    [onSubmit, reset]
  );

  return (
    <div className="card-form">
      <Form
        onSubmit={handleSubmit(onSuccess)}
        noValidate
        className={styles['card-form']}
        submitMessage="Submit"
        method="get"
        name="card-form"
      >
        <Input
          type="text"
          label="Enter title:"
          {...register('title', {
            required: true,
            validate: (title) => Boolean(title.trim()) || 'Title required.',
          })}
        />
        <ValidationMessage fieldError={errors.title} />

        <TextArea label="Enter description:" {...register('description')} />

        <Input
          type="text"
          label={
            <span>
              Enter Your name.
              <br />
              It will be on created card:
            </span>
          }
          {...register('createdBy', {
            required: 'Your name required.',
            pattern: {
              value: /([A-Z][a-z]+\s?){2}/,
              message: 'Please match the requested format.',
            },
          })}
        />
        <ValidationMessage fieldError={errors.createdBy}>
          Examples: John Doe, Jane Doe.
        </ValidationMessage>

        <FilePicker
          label="Upload image file:"
          accept="image"
          {...register('imgUrl', { required: 'Please select a file.' })}
        />
        <ValidationMessage fieldError={errors.imgUrl} />

        <Select
          label="Select topic:"
          {...register('topics', {
            required: 'Please select an item in the list.',
          })}
        >
          {[
            { value: 'programming', label: 'Programming' },
            { value: 'travelling', label: 'Travelling' },
          ]}
        </Select>
        <ValidationMessage fieldError={errors.topics} />

        <Input
          type="text"
          label={
            <span>
              Enter tags,
              <br />
              separate using comma:
            </span>
          }
          pattern="(.+(, )?)+"
          {...register('tags', {
            required: 'Please fill out this field.',
            pattern: /(.+(, )?)+/,
          })}
        />
        <ValidationMessage fieldError={errors.tags} />

        <RadioGroup
          legend="Choose visibility"
          {...register('visibility', {
            required: 'Please select one of these options.',
          })}
        >
          {[
            { value: CardVisibilityType.ONLY_YOU, label: 'Only for You' },
            { value: CardVisibilityType.PUBLIC, label: 'Public' },
          ]}
        </RadioGroup>
        <ValidationMessage fieldError={errors.visibility} />

        <DatePicker
          label="Pick publication date:"
          {...register('creationDate', {
            min: toDateInputMinFormat(new Date()),
            required: 'Please fill out this field.',
            valueAsNumber: true,
          })}
        />
        <ValidationMessage fieldError={errors.creationDate} />

        <CheckBox
          label="Allow process the data?"
          defaultChecked
          {...register('allowProcessData', {
            required: 'Please check this box if you want to proceed.',
          })}
        />
        <ValidationMessage fieldError={errors.allowProcessData} />
      </Form>
    </div>
  );
};
