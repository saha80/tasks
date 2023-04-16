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
  ValidationMessage,
} from '@/components';
import { toDateInputMinFormat } from '@/utils/date';
import { readAsDataURL } from '@/utils/readAsDataURL';

import styles from './CardForm.module.css';

export type InputCard = Omit<CardProps, 'id' | 'createdByURL'>;

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
  collections: string;
  tags: string;
  visibility: CardVisibilityType;
  creationDate: Date;
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
      const card: InputCard = {
        description: data.description,
        createdBy: data.createdBy.trim(),
        imgSrc: await readAsDataURL(data.imgUrl[0]),
        creationTimestamp: data.creationDate.getTime(),
        modificationTimestamp: data.creationDate.getTime(),
        likes: 0,
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
          label="Select topic:"
          {...register('collections', {
            required: 'Please select an item in the list.',
          })}
        >
          {[
            { value: 'programming', label: 'Programming' },
            { value: 'travelling', label: 'Travelling' },
          ]}
        </Select>
        <ValidationMessage fieldError={errors.collections} />

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
