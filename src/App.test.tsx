import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/routes/Routes';

describe('App', () => {
  test('renders', async () => {
    render(<RouterProvider router={router} />);

    const home = await screen.findByText('Home');
    const cardForm = await screen.findByText('Card Form');
    const aboutUs = await screen.findByText('About Us');

    expect(home.innerHTML).toEqual('Home');
    expect(cardForm.innerHTML).toEqual('Card Form');
    expect(aboutUs.innerHTML).toEqual('About Us');

    expect(screen.getByText(/Current path:/i)).toContain(/Home/i);
  });
});
