import { FC, useCallback, useContext, useEffect, useRef } from 'react';

import { Search as BaseSearch, SearchProps } from '@/components/Search/Search';
import { CardsContext } from '@/context/CardsContext';

import { searchLocalStorage } from '@/utils/searchLocalStorage';
import { useBeforeUnload } from 'react-router-dom';

export const Search: FC<Pick<SearchProps, 'className'>> = ({ className }) => {
  const { searchValue, onChange, filterBy } = useContext(CardsContext);

  const ref = useRef(searchValue);

  useEffect(() => {
    ref.current = searchValue;
  }, [searchValue]);

  useBeforeUnload(
    useCallback(() => {
      if (ref.current !== null) {
        searchLocalStorage.set(ref.current);
      }
    }, [])
  );

  useEffect(() => {
    const storageValue = searchLocalStorage.get();
    if (storageValue !== null) {
      onChange(storageValue);
    }

    return () => {
      if (ref.current !== null) {
        searchLocalStorage.set(ref.current);
      }
    };
  }, [onChange]);

  return (
    <BaseSearch
      value={searchValue}
      onChange={onChange}
      placeholder={`Search by ${filterBy}...`}
      className={className}
    />
  );
};
