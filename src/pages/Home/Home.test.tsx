import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RouterProvider } from 'react-router-dom';

import { router } from '@/routes/Routes';

import { Home } from './Home';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

describe('Home', () => {
  test('renders', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    const createdBy = /loading.../i;

    const [renderedCard] = await screen.findAllByText(createdBy);
    expect(renderedCard.innerHTML).toMatch(createdBy);
  });

  test('searches', async () => {
    render(<RouterProvider router={router} />);
    const title = 'asdf';

    const search = await screen.findByPlaceholderText(/Search.../i);
    await userEvent.click(search);
    await userEvent.keyboard(title);

    expect(screen.queryAllByText('Typescript')).toHaveLength(0);
  });
});
