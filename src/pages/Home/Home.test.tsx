import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import * as RTK from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';

import { configureStoreOptions } from '@/app/rootReducer';
import { Home } from './Home';
import { Provider } from 'react-redux';
import type { Raw } from '@/interfaces/redux';

const { configureStore } = (RTK as Raw<typeof RTK>).default ?? RTK;

describe('Home', () => {
  const store = configureStore(configureStoreOptions);

  test('renders', async () => {
    const { queryByRole, getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(queryByRole('progressbar')).toBeInTheDocument();
    await waitForElementToBeRemoved(queryByRole('progressbar'));

    expect(getByText(/react/i)).toBeInTheDocument();
  });

  test('on card click', async () => {
    const { getByText, queryByRole, queryByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await userEvent.click(getByText(/react/i));
    let progressBar = queryByRole('progressbar');
    if (progressBar) {
      await waitForElementToBeRemoved(progressBar);
    }

    expect(queryByRole('alert')).not.toBeInTheDocument();
    expect(getByText(/first card/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: '' }));
    expect(queryByText(/first card/i)).not.toBeInTheDocument();

    await userEvent.click(getByText(/forest/i));
    progressBar = queryByRole('progressbar');
    if (progressBar) {
      await waitForElementToBeRemoved(progressBar);
    }

    expect(queryByRole('alert')).not.toBeInTheDocument();
    expect(getByText(/Country:/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: '' }));
    expect(queryByText(/Country:/i)).not.toBeInTheDocument();
  });

  test('searches', async () => {
    const { queryByRole, queryAllByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    let progressBar = queryByRole('progressbar');
    if (progressBar) {
      await waitForElementToBeRemoved(progressBar);
    }

    await userEvent.type(screen.getByRole('searchbox'), 'react{Enter}');

    progressBar = queryByRole('progressbar');
    if (progressBar) {
      await waitForElementToBeRemoved(progressBar);
    }

    expect(queryAllByText(/alex/i)).toHaveLength(1);
  });

  test('did not match', async () => {
    const { queryByRole, queryAllByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    let progressBar = queryByRole('progressbar');
    if (progressBar) {
      await waitForElementToBeRemoved(progressBar);
    }

    await userEvent.type(screen.getByRole('searchbox'), 'did not match{Enter}');

    progressBar = queryByRole('progressbar');
    if (progressBar) {
      await waitForElementToBeRemoved(progressBar);
    }

    expect(queryAllByText(/alex/i)).toHaveLength(0);
  });
});
