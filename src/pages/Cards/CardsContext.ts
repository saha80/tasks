import { createContext } from 'react';
import { InputProps } from '@/components/Search/components/Input';

export type SearchBy = 'title';

export interface CardsContext {
  searchValue: string | null;
  filterBy: SearchBy;
  onChange: InputProps['onChange'];
}

export const initialCardsContextValue: CardsContext = {
  searchValue: null,
  filterBy: 'title',
  onChange: () => {
    throw new Error('initial onChange must be overwritten');
  },
};

export const CardsContext = createContext<CardsContext>(initialCardsContextValue);
