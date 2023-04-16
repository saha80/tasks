import { FC, useCallback, useContext, useEffect, useRef } from 'react';
import { useBeforeUnload } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Search as BaseSearch, Form, SearchProps } from '@/components';
import { CardsContext } from '@/context/CardsContext';
import { searchLocalStorage } from '@/utils/searchLocalStorage';

import styles from './Search.module.css';

export const Search: FC<Pick<SearchProps, 'className'>> = ({ className }) => {
  const { searchValue, onSearch } = useContext(CardsContext);

  const ref = useRef<HTMLInputElement | null>(null);

  useBeforeUnload(
    useCallback(() => {
      searchLocalStorage.set(ref.current?.value ?? '');
    }, [])
  );

  useEffect(() => {
    const { current } = ref;
    return () => {
      searchLocalStorage.set(current?.value ?? '');
    };
  }, []);

  const { register, handleSubmit } = useForm<{ query: string }>({
    defaultValues: {
      query: searchValue ?? '',
    },
  });

  const { ref: registerRef, ...registerSearch } = register('query');

  return (
    <Form
      role="search"
      className={styles.searchForm}
      method="get"
      onSubmit={handleSubmit(({ query }) => {
        if (query) {
          onSearch(query);
          searchLocalStorage.set(query);
        }
      })}
      submitClassName={styles.submitButton}
      submitMessage="Search"
    >
      <BaseSearch
        ref={(instance) => {
          registerRef(instance);
          ref.current = instance;
        }}
        {...registerSearch}
        className={(className ?? '') + ' ' + styles.search}
        placeholder="Search..."
      />
    </Form>
  );
};
