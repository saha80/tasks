import { FC } from 'react';
import { CardList as BaseCardList, Error, Progress } from '@/components';
import { useGetCardListByQuery } from '@/services/unsplash.service';

import { CardListProps } from './CardList';

export type CardListByQueryProps = CardListProps & {
  searchValue: string;
};

export const CardListByQuery: FC<CardListByQueryProps> = ({
  onCardClick,
  searchValue,
}) => {
  const { isError, isFetching, currentData } = useGetCardListByQuery({
    query: searchValue,
  });

  if (isError) {
    return <Error />;
  }

  if (isFetching || !currentData) {
    return <Progress />;
  }

  if (!currentData.length) {
    return <div>Your search - {searchValue} - did not match any photo.</div>;
  }

  return <BaseCardList onCardClick={onCardClick}>{currentData}</BaseCardList>;
};
