import { Component } from 'react';

import { Image, ImageProps } from './components/Image';
import { Title, TitleProps } from './components/Title';
import { Description, DescriptionProps } from './components/Description';
import { CreationDetails, CreationDetailsProps } from './components/CreationDetails';
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

export class Card extends Component<CardProps> {
  render() {
    const {
      src,
      title,
      description,
      createdBy,
      creationTimestamp,
      modificationTimestamp,
      tags,
      likes,
      views,
    } = this.props;

    return (
      <div className="card">
        <Image src={src} />
        <Title title={title} />
        <Description description={description} />
        <CreationDetails
          createdBy={createdBy}
          creationTimestamp={creationTimestamp}
          modificationTimestamp={modificationTimestamp}
          tags={tags}
        />
        <Status likes={likes} views={views} />
      </div>
    );
  }
}
