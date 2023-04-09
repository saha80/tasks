import { FC } from 'react';

import styles from '../Card.module.css';

export interface CreationDetailsProps {
  createdBy: string;
  creationTimestamp: number;
  modificationTimestamp: number;
}

const creationMessage = (creationTimestamp: number) =>
  Date.now() < creationTimestamp ? 'Created at: ' : 'Will be created at: ';

export const CreationDetails: FC<CreationDetailsProps> = ({
  createdBy,
  creationTimestamp,
  modificationTimestamp,
}) => (
  <div className={styles.creationDetails}>
    <div>
      <p className={styles.createdBy}>
        Created by: <a>{createdBy}</a>
      </p>
      <p>
        {creationMessage(creationTimestamp)}
        {new Date(creationTimestamp).toDateString()}
      </p>
      {!Object.is(creationTimestamp, modificationTimestamp) && (
        <p>Modified at: {new Date(modificationTimestamp).toDateString()}</p>
      )}
    </div>
  </div>
);
