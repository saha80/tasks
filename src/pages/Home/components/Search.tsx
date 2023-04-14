import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { RootState } from '@/app/store';
import { Search as BaseSearch, Form, SearchProps } from '@/components';

import styles from './Search.module.css';
import { search } from './searchSlice';

export const Search: FC<Pick<SearchProps, 'className'>> = ({
  className = '',
}) => {
  const dispatch = useDispatch();
  const { searchValue } = useSelector((state: RootState) => state.search);

  const { register, handleSubmit } = useForm<{ query: string }>({
    defaultValues: {
      query: searchValue,
    },
  });

  return (
    <Form
      role="search"
      className={styles.searchForm}
      method="get"
      onSubmit={handleSubmit(({ query }) => {
        dispatch(search.actions.onSearch(query));
      })}
      submitClassName={styles.submitButton}
      submitMessage="Search"
    >
      <BaseSearch
        {...register('query')}
        className={`${className} ${styles.search}`}
        placeholder="Search..."
      />
    </Form>
  );
};
