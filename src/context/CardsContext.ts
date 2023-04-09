import { createContext } from 'react';

export interface CardsContextType {
  searchValue: string | null;
  onSearch: (query: string) => void;
}

export const CardsContext = createContext<CardsContextType>({
  searchValue: null,
  onSearch: () => {
    throw new Error('initial onChange must be overwritten');
  },
});
