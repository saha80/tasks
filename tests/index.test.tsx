import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';

import { AboutUs } from '../src/components/AboutUs/AboutUs';
import { Card } from '../src/components/Card/Card';
import { Cards } from '../src/components/Cards/Cards';
import { router } from '../src/pages/Routes';

import { getCards } from '../src/service/Card';

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
