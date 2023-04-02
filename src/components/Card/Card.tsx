import { FC } from 'react';

import { Image, ImageProps } from './components/Image';
import { Title, TitleProps } from './components/Title';
import { Description, DescriptionProps } from './components/Description';
import {
  CreationDetails,
  CreationDetailsProps,
} from './components/CreationDetails';
import { Status, StatusProps } from './components/Status';

import './Card.css';

export interface CardProps
  extends ImageProps,
    TitleProps,
    DescriptionProps,
    CreationDetailsProps,
    StatusProps {
  id: number;
}

export const Card: FC<CardProps> = ({
  src,
  title,
  description,
  createdBy,
  creationTimestamp,
  modificationTimestamp,
  topics,
  tags,
  visibility,
  likes,
  views,
}) => (
  <div className="card">
    <Image src={src} />
    <Title title={title} />
    <Description description={description} />
    <CreationDetails
      createdBy={createdBy}
      creationTimestamp={creationTimestamp}
      modificationTimestamp={modificationTimestamp}
      topics={topics}
      tags={tags}
      visibility={visibility}
    />
    <Status likes={likes} views={views} />
  </div>
);
