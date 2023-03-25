import { FC } from 'react';

import { Card, CardProps } from '@/components/Card/Card';

import { CardsContext } from './CardsContext';

import './Cards.css';

export interface CardsProps {
  cards: Array<CardProps>;
}

export const Cards: FC<CardsProps> = ({ cards }) => (
  <div className="cards">
    <CardsContext.Consumer>
      {({ filterBy, searchValue }) =>
        cards
          .filter((card) =>
            card[filterBy]
              .toLowerCase()
              .includes((searchValue ?? '').toLowerCase())
          )
          .map((card) => <Card key={card.id} {...card} />)
      }
    </CardsContext.Consumer>
  </div>
);
