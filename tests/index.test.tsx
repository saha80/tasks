import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';

import { AboutUs } from '@/components/AboutUs/AboutUs';
import { Card } from '@/components/Card/Card';
import { Cards } from '@/pages/Cards/Cards';
import { router } from '@/routes/Routes';

import { getCards } from '@/services/Card';

describe('App', () => {
  test('renders', () => {
    render(<RouterProvider router={router} />);

    screen.debug();
  });

  test('Cards', () => {
    render(<Cards />);

    screen.debug();
  });

  test('Card', async () => {
    for (const card of await getCards()) {
      render(<Card {...card} />);
    }

    screen.debug();
  });

  test('AboutUs', () => {
    render(<AboutUs />);

    screen.debug();
  });
});
