import * as RTK from '@reduxjs/toolkit';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Provider } from 'react-redux';

import { cardDetailsList } from 'tests/mockData';
import { Cards } from './Cards';
import { configureStoreOptions } from '@/app/rootReducer';
import type { Raw } from '@/utils/redux';

const { configureStore } = (RTK as Raw<typeof RTK>).default ?? RTK;

describe('Cards with service', () => {
  const store = configureStore(configureStoreOptions);

  test('renders', async () => {
    render(
      <Provider store={store}>
        <Cards />
      </Provider>
    );

    expect(screen.getByText(/progressing/i)).toBeInTheDocument();

    await waitForElementToBeRemoved(screen.queryByRole('progressbar'));

    expect(screen.getAllByText(/Alex/i)).toHaveLength(cardDetailsList.length);
  });
});
