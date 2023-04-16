import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '@/app/store';

import { Cards } from './Cards';
import { cardDetailsList } from 'tests/mockData';

describe('Cards with service', () => {
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
