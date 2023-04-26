import { FC } from 'react';

import {
  CardList as BaseCardList,
  CardListProps as BaseCardListProps,
  Error,
  Progress,
} from '@/components';
import { useGetCardList } from '@/services/unsplash.service';
import { useSelector } from '@/app/rootReducer';

import { CardListByQuery } from './CardListByQuery';

export type CardListProps = Required<Pick<BaseCardListProps, 'onCardClick'>>;

export const CardList: FC<CardListProps> = ({ onCardClick }) => {
  const { searchValue } = useSelector((store) => store.search);

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
    return <Error />;
  }

  if (isFetching || !currentData) {
    return <Progress message="Progressing..." />;
  }

  return <BaseCardList onCardClick={onCardClick}>{currentData}</BaseCardList>;
};
