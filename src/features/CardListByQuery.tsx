import { FC } from 'react';
import {
  CardList as BaseCardList,
  FetchingError,
  FetchingProgress,
} from '@/components';
import { useGetCardListByQuery } from '@/features/unsplash.servise';

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
    return <FetchingError />;
  }

  if (isFetching || !currentData) {
    return <FetchingProgress label="Progressing..." />;
  }

  if (!currentData.length) {
    return <div>Your search - {searchValue} - did not match any photo.</div>;
  }

  return <BaseCardList onCardClick={onCardClick}>{currentData}</BaseCardList>;
};
