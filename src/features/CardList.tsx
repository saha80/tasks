import { FC } from 'react';
import { useSelector } from 'react-redux';

import {
  CardList as BaseCardList,
  CardListProps as BaseCardListProps,
  FetchingError,
  FetchingProgress,
} from '@/components';
import { useGetCardList } from '@/features/unsplash.servise';
import { RootState } from '@/app/store';

import { CardListByQuery } from './CardListByQuery';

export type CardListProps = Required<Pick<BaseCardListProps, 'onCardClick'>>;

export const CardList: FC<CardListProps> = ({ onCardClick }) => {
  const { searchValue } = useSelector((store: RootState) => store.search);

  const { isUninitialized, isError, isFetching, currentData } = useGetCardList(
    undefined,
    {
      skip: Boolean(searchValue),
    }
  );

  if (isUninitialized) {
    return (
      <CardListByQuery onCardClick={onCardClick} searchValue={searchValue} />
    );
  }

  if (isError) {
    return <FetchingError />;
  }

  if (isFetching || !currentData) {
    return <FetchingProgress label="Progressing..." />;
  }

  return <BaseCardList onCardClick={onCardClick}>{currentData}</BaseCardList>;
};
