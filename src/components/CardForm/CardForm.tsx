import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as RTK from '@reduxjs/toolkit';
import { type FC } from 'react';

import type { Raw } from '@/interfaces/redux';

// https://github.com/reduxjs/redux-toolkit/issues/1960#issuecomment-1022277429
const { nanoid } = (RTK as Raw<typeof RTK>).default ?? RTK;

import { type CardProps } from '@/components/Card/Card';
import { CheckBox } from '@/components/CheckBox/CheckBox';
import { DatePicker } from '@/components/DatePicker/DatePicker';
import { FilePicker } from '@/components/FilePicker/FilePicker';
import { Form } from '@/components/Form/Form';
import { Input } from '@/components/Input/Input';
import { RadioGroup } from '@/components/RadioGroup/RadioGroup';
import { Select } from '@/components/Select/Select';
import { ValidationMessage } from '@/components/ValidationMessage/ValidationMessage';

import { toDateInputMinFormat } from '@/utils/date';
import { readAsDataURL } from '@/utils/readAsDataURL';

import styles from './CardForm.module.css';

export interface CardFormProps {
  onSubmit: (card: InputCard) => void;
}

enum CardVisibilityType {
  ONLY_YOU = 'only-you',
  PUBLIC = 'public',
}

interface CardFieldValues {
  description: string;
  createdBy: string;
  imgUrl: FileList;
  collection: string;
  tags: string;
  visibility: CardVisibilityType;
  creationDate: Date;
  allowProcessData: boolean;
}

export type InputCard = Omit<CardProps, 'createdByURL' | 'children'> &
  Pick<
    CardFieldValues,
    'allowProcessData' | 'collection' | 'tags' | 'visibility'
  >;

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
      const card: InputCard = {
        id: nanoid(),
        description: data.description,
        createdBy: data.createdBy.trim(),
        imgSrc: await readAsDataURL(data.imgUrl[0]),
        creationTimestamp: data.creationDate.getTime(),
        modificationTimestamp: data.creationDate.getTime(),
        likes: 0,
        collection: data.collection,
        tags: data.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
          .join(', '),
        visibility: data.visibility,
        allowProcessData: data.allowProcessData,
      };

      if (window.confirm('Information has been saved. Add card?')) {
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
        className={styles.cardForm}
        submitMessage="Submit"
        submitClassName={styles.submit}
        method="post"
        name="card-form"
      >
        <Input
          type="text"
          label="Enter description:"
          {...register('description', {
            required: true,
            validate: (description) =>
              Boolean(description.trim()) || 'Description required.',
          })}
        />
        <ValidationMessage fieldError={errors.description} />

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
          label="Select collection:"
          {...register('collection', {
            required: 'Please select an item in the list.',
          })}
        >
          {[
            { value: 'programming', label: 'Programming' },
            { value: 'travelling', label: 'Travelling' },
          ]}
        </Select>
        <ValidationMessage fieldError={errors.collection} />

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
            valueAsDate: true,
          })}
        />
        <ValidationMessage fieldError={errors.creationDate} />

        <CheckBox
          label="Allow process the data?"
          {...register('allowProcessData', {
            required: 'Please check this box if you want to proceed.',
          })}
        />
        <ValidationMessage fieldError={errors.allowProcessData} />
      </Form>
    </div>
  );
};
