import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';

import { AboutUs } from '@/pages/AboutUs/AboutUs';
import { Cards } from '@/pages/Cards/Cards';
import { router } from '@/routes/Routes';

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
    render(<Cards />);

    screen.debug();
  });

  test('AboutUs', () => {
    render(<AboutUs />);

    screen.debug();
  });
});
