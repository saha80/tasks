import { type FC } from 'react';

import { CardList as BaseCardList } from '@/components/CardList/CardList';
import { Error } from '@/components/Error/Error';
import { Progress } from '@/components/Progress/Progress';
import { useGetCardListByQuery } from '@/services/unsplash.service';

import { type CardListProps } from './CardList';

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
