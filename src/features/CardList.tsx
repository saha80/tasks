import { type FC } from 'react';

import {
  CardList as BaseCardList,
  type CardListProps as BaseCardListProps,
} from '@/components/CardList/CardList';
import { Error } from '@/components/Error/Error';
import { Progress } from '@/components/Progress/Progress';
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
