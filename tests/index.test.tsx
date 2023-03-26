import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/routes/Routes';
import { AboutUs } from '@/pages/AboutUs/AboutUs';

import { Card } from '@/components/Card/Card';
import { Cards } from '@/components/Cards/Cards';
import { card, cards } from './mockData';

describe('App', () => {
  test('renders', async () => {
    render(<RouterProvider router={router} />);

    const [home] = await screen.findAllByText('Home');
    expect(home.innerHTML).toEqual('Home');

    screen.debug();
  });

  test('Cards', async () => {
    render(<Card {...card} />);

    const [renderedCard] = await screen.findAllByText(card.title);
    expect(renderedCard.innerHTML).toEqual(card.title);

    screen.debug();
  });

  test('Card', async () => {
    render(<Cards {...cards} />);

    const [renderedCard] = await screen.findAllByText(cards.cards[2].title);
    expect(renderedCard.innerHTML).toEqual(cards.cards[2].title);

    screen.debug();
  });

  test('AboutUs', () => {
    render(<AboutUs />);

    screen.debug();
  });
});
