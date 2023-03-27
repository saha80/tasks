import { createContext } from 'react';
import { InputProps } from '@/components/Search/components/Input';

export type SearchBy = 'title';

export interface ICardsContext {
  searchValue: string | null;
  filterBy: SearchBy;
  onChange: InputProps['onChange'];
}

export const initialCardsContextValue: ICardsContext = {
  searchValue: null,
  filterBy: 'title',
  onChange: () => {
    throw new Error('initial onChange must be overwritten');
  },
};

export const CardsContext = createContext<ICardsContext>(initialCardsContextValue);
