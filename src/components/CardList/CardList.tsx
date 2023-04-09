import { FC } from 'react';

import { Card, CardProps } from '@/components/Card/Card';

import styles from './CardList.module.css';

export interface CardListProps {
  onCardClick?: (id: CardProps['id']) => void;
  children: readonly Omit<CardProps, 'onClick'>[];
}

export const CardList: FC<CardListProps> = ({ onCardClick, children }) => (
  <div className={styles.cardList}>
    {children.map((card) => (
      <Card key={card.id} onClick={onCardClick} {...card} />
    ))}
  </div>
);
