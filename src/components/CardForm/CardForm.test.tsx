import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import * as RTK from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';

import type { Raw } from '@/interfaces/redux';
import { configureStoreOptions } from '@/app/rootReducer';

import { CardForm } from './CardForm';

// https://github.com/reduxjs/redux-toolkit/issues/1960#issuecomment-1022277429
const { configureStore } = (RTK as Raw<typeof RTK>).default ?? RTK;

// todo add more cases for cardForm on validation
describe('CardForm', () => {
  const store = configureStore(configureStoreOptions);

  test('renders', async () => {
    const onSubmit = vi.fn();

    render(
      <Provider store={store}>
        <CardForm onSubmit={onSubmit} />
      </Provider>
    );

    await userEvent.type(screen.getByLabelText(/description/i), ' ');

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(
      screen.getByText(/Examples: John Doe, Jane Doe./i)
    ).toBeInTheDocument();

    expect(screen.queryAllByRole('alert')).not.toHaveLength(1);
    expect(onSubmit).not.toBeCalled();
  });

  test('submit', async () => {
    const onSubmit = vi.fn();

    render(
      <Provider store={store}>
        <CardForm onSubmit={onSubmit} />
      </Provider>
    );

    await userEvent.type(screen.getByLabelText(/description/i), 'test');

    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');

    const file = [new File([], 'test.png', { type: 'image/png' })];

    await userEvent.upload(screen.getByLabelText(/image file/i), file);

    await userEvent.selectOptions(
      screen.getByLabelText(/select/i),
      'Programming'
    );

    await userEvent.type(screen.getByLabelText(/tags/i), 'tag');

    await userEvent.click(screen.getByLabelText(/Only for You/i));

    await userEvent.type(screen.getByLabelText(/pick/i), '3023-01-01');

    await userEvent.click(screen.getByRole('checkbox'));

    expect(screen.getByRole('form')).toHaveFormValues({
      description: 'test',
      createdBy: 'John Doe',
      collection: 'Programming',
      tags: 'tag',
      visibility: 'only-you',
      creationDate: '3023-01-01',
      allowProcessData: true,
    });
    expect(
      (screen.getByLabelText(/image file/i) as unknown as HTMLInputElement) // hack
        .files
    ).toHaveLength(1);

    {
      const confirmSpy = vi.spyOn(window, 'confirm');
      confirmSpy.mockImplementation(vi.fn(() => true));

      await userEvent.click(screen.getByRole('button', { name: /submit/i }));

      confirmSpy.mockRestore();
    }

    expect(screen.queryAllByRole('alert')).toHaveLength(0);

    expect(onSubmit).toBeCalledTimes(1);
  });
});
