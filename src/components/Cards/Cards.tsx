import { FC } from 'react';

import { Card, CardProps } from '@/components/Card/Card';

import './Cards.css';

export interface CardsProps {
  cards: Array<CardProps>;
}

export const Cards: FC<CardsProps> = ({ cards }) => (
  <div className="cards">
    {cards.map((card) => (
      <Card key={card.id} {...card} />
    ))}
  </div>
);
