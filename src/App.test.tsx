import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/routes/Routes';

describe('App', () => {
  test('renders', async () => {
    render(<RouterProvider router={router} />);

    const [home] = await screen.findAllByText('Home');
    expect(home.innerHTML).toEqual('Home');

    screen.debug();
  });
});
