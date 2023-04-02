import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RouterProvider } from 'react-router-dom';

import { router } from '@/routes/Routes';

import { Home } from './Home';

describe('Home', () => {
  test('renders', async () => {
    render(<Home />);
    const title = 'Typescript';

    const [renderedCard] = await screen.findAllByText(title);
    expect(renderedCard.innerHTML).toContain(title);
  });

  test('searches', async () => {
    render(<RouterProvider router={router} />);
    const title = 'asdf';

    const search = await screen.findByPlaceholderText('Search by title...');
    await userEvent.click(search);
    await userEvent.keyboard(title);

    const cards = screen.queryAllByText('Typescript');
    expect(cards.length).toEqual(0);
  });
});
