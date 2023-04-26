import { FC, ReactNode, useCallback } from 'react';
import { MdThumbUp } from 'react-icons/md/index';

import { Card as BaseCard } from '@/interfaces/Card';

import styles from './Card.module.css';

export interface CardProps extends BaseCard {
  children?: ReactNode;
  onClick?: (id: BaseCard['id']) => void;
}

export const Card: FC<CardProps> = ({
  id,
  imgSrc,
  imgAlt,
  description,
  createdBy,
  creationTimestamp,
  modificationTimestamp,
  children,
  likes,
  onClick,
}) => {
  const onCardClick = useCallback(() => {
    onClick?.(id);
  }, [id, onClick]);

  return (
    <div className={`${styles.card} card`} onClick={onCardClick}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <div className={styles.description}>{description}</div>
      <div className={styles.creationDetails}>
        <div>
          <p className={styles.createdBy}>
            Created by: <a>{createdBy}</a>
          </p>
          <p>Created at: {new Date(creationTimestamp).toDateString()}</p>
          {!Object.is(creationTimestamp, modificationTimestamp) && (
            <p>Modified at: {new Date(modificationTimestamp).toDateString()}</p>
          )}
        </div>
      </div>
      {children}
      <div className={styles.status}>
        <span>
          <MdThumbUp />
          {likes}
        </span>
      </div>
    </div>
  );
};
