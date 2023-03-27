import { FC } from 'react';

import { CardList, CardListProps } from '@/components/CardList/CardList';
import { CardsContext } from '@/context/CardsContext';
import { withService } from '@/hoc/withService';
import { CardService } from '@/services/card.servise';

const CardsWithContext: FC<CardListProps> = ({ children }) => (
  <CardsContext.Consumer>
    {({ filterBy, searchValue }) => (
      <CardList>
        {children.filter((card) =>
          card[filterBy]
            .toLowerCase()
            .includes((searchValue ?? '').toLowerCase())
        )}
      </CardList>
    )}
  </CardsContext.Consumer>
);

export const Cards = withService(
  CardsWithContext,
  CardService.get,
  (service) => ({
    children: service.map(({ imgSrc, ...other }) => ({
      src: imgSrc,
      ...other,
    })),
  })
);
