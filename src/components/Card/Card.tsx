import { FC, useCallback } from 'react';
import { MdThumbUp } from 'react-icons/md';

import { Card as CardType } from '@/interfaces/Card';

import { CreationDetails } from './components/CreationDetails';

import styles from './Card.module.css';

export interface CardProps extends CardType {
  onClick?: (id: CardType['id']) => void;
}

export const Card: FC<CardProps> = ({
  id,
  imgSrc,
  imgAlt,
  description,
  createdBy,
  creationTimestamp,
  modificationTimestamp,
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
      <CreationDetails
        createdBy={createdBy}
        creationTimestamp={creationTimestamp}
        modificationTimestamp={modificationTimestamp}
      />
      <div className={styles.status}>
        <span>
          <MdThumbUp />
          {likes}
        </span>
      </div>
    </div>
  );
};
