import { FC } from 'react';

import { Card, CardProps } from '@/components/Card/Card';

import './CardList.css';

export interface CardListProps {
  children: ReadonlyArray<CardProps>;
}

export const CardList: FC<CardListProps> = ({ children }) => (
  <div className="cards">
    {children.map((card) => (
      <Card key={card.id} {...card} />
    ))}
  </div>
);
