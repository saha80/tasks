import { FC } from 'react';

import { Cards as BaseCards, CardsProps } from '@/components/Cards/Cards';
import { CardsContext } from '@/components/Cards/CardsContext';
import { withService } from '@/hoc/withService';
import { getCards } from '@/services/Card';

const CardsWithContext: FC<CardsProps> = ({ cards }) => (
  <CardsContext.Consumer>
    {({ filterBy, searchValue }) => (
      <BaseCards
        cards={cards.filter((card) =>
          card[filterBy]
            .toLowerCase()
            .includes((searchValue ?? '').toLowerCase())
        )}
      />
    )}
  </CardsContext.Consumer>
);

export const Cards = withService(CardsWithContext, getCards, (service) => ({
  cards: service.map(({ imgSrc, ...other }) => ({ src: imgSrc, ...other })),
}));
