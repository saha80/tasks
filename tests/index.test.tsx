import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';

import { Cards } from '../src/components/Cards/Cards';
import { router } from '../src/pages/Routes';

describe('App', () => {
  it('renders', () => {
    render(<RouterProvider router={router} />);

    screen.debug();
  });

  it('Cards', () => {
    render(<Cards />);

    screen.debug();
  });
});
