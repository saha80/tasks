import { FC, useContext, useEffect, useState } from 'react';

import { FetchingProgress, FetchingError, CardListProps } from '@/components';
import { CardService } from '@/interfaces/CardService';
import { Card } from '@/interfaces/Card';
import { CardsContext } from '@/context/CardsContext';

export type CardListWithServiceProps = Omit<CardListProps, 'children'>;

export const cardListWithService = (
  Wrapped: React.ComponentType<CardListProps>,
  cardService: CardService
) => {
  const CardListWithService: FC<CardListWithServiceProps> = (props) => {
    const { searchValue } = useContext(CardsContext);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>(undefined);
    const [cardList, setCardList] = useState<Card[] | undefined>(undefined);

    useEffect(() => {
      const abortController = new AbortController();

      (searchValue
        ? cardService.getCardListByQuery(abortController.signal, {
            query: searchValue,
          })
        : cardService.getCardList(abortController.signal)
      )
        .then(setCardList)
        .catch((err: Error) => {
          if (err instanceof DOMException && err.name === 'AbortError') {
            return;
          }
          setError(err);
        })
        .finally(() => setLoading(false));

      return () => {
        abortController.abort();
      };
    }, [searchValue]);

    if (error) {
      return <FetchingError />;
    }

    if (loading || !cardList) {
      return <FetchingProgress label="Progressing..." />;
    }

    if (!cardList.length) {
      return <div>Your search - {searchValue} - did not match any photo.</div>;
    }

    return <Wrapped {...props}>{cardList}</Wrapped>;
  };

  return CardListWithService;
};
