import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import * as RTK from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';

import { CardFormPage } from '@/pages/CardFormPage/CardFormPage';
import { configureStoreOptions } from '@/app/rootReducer';
import type { Raw } from '@/interfaces/redux';

const { configureStore } = (RTK as Raw<typeof RTK>).default ?? RTK;

describe('CardFormPage', () => {
  const store = configureStore(configureStoreOptions);

  test('renders', () => {
    render(
      <Provider store={store}>
        <CardFormPage />
      </Provider>
    );

    expect(screen.getByText(/no cards/i)).toBeInTheDocument();
  });

  test('adds new card', async () => {
    render(
      <Provider store={store}>
        <CardFormPage />
      </Provider>
    );

    await userEvent.type(screen.getByLabelText(/description/i), 'test');

    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');

    await userEvent.upload(
      screen.getByLabelText(/image file/i),
      new File([], 'test.png', { type: 'image/png' })
    );

    await userEvent.selectOptions(
      screen.getByLabelText(/select/i),
      'Programming'
    );

    await userEvent.type(screen.getByLabelText(/tags/i), 'tag');

    await userEvent.click(screen.getByLabelText(/Only for You/i));

    await userEvent.type(screen.getByLabelText(/pick/i), '3023-01-01');

    await userEvent.click(screen.getByRole('checkbox'));

    {
      const confirmSpy = vi.spyOn(window, 'confirm');
      confirmSpy.mockImplementation(vi.fn(() => true));

      await userEvent.click(screen.getByRole('button', { name: /submit/i }));

      confirmSpy.mockRestore();
    }

    expect(screen.queryAllByText(/no cards/i)).toHaveLength(0);
    expect(screen.queryAllByText('test')).toHaveLength(1);
  });
});
