import { FC } from 'react';

export interface CreationDetailsProps {
  createdBy: string;
  creationTimestamp: number;
  modificationTimestamp: number;
  topics: Array<string>;
  tags: Array<string>;
  visibility: 'only-you' | 'you-and-friends' | 'public';
}

export const CreationDetails: FC<CreationDetailsProps> = ({
  createdBy,
  creationTimestamp,
  modificationTimestamp,
  topics,
  tags,
}) => (
  <div className="card-creation-details">
    <div>
      <p className="card-author">
        Created by: <a>{createdBy}</a>
      </p>
      <p>Created at: {new Date(creationTimestamp).toDateString()}</p>
      {!Object.is(creationTimestamp, modificationTimestamp) && (
        <p>Modified at: {new Date(modificationTimestamp).toDateString()}</p>
      )}
    </div>
    <span className="card-topics">
      <span>topics: </span>
      {topics.map((tag, index) => (
        <a key={index}>{tag}</a>
      ))}
    </span>
    <span className="card-tags">
      <span>Tags: </span>
      {tags.map((tag, index) => (
        <a key={index}>{tag}</a>
      ))}
    </span>
  </div>
);
