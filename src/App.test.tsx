import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { routeObject } from '@/routes/Routes';

describe('App', () => {
  test('renders', () => {
    const router = createMemoryRouter(routeObject);
    render(<RouterProvider router={router} />);

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Card Form' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About Us' })).toBeInTheDocument();

    expect(screen.getByText(/Current path:/i)).toContain(/Home/i);
  });

  test('navigates', async () => {
    const router = createMemoryRouter(routeObject);
    render(<RouterProvider router={router} />);

    expect(screen.getByText(/Current path:/i)).toContain(/Home/i);

    await userEvent.click(screen.getByRole('link', { name: 'Card Form' }));
    expect(screen.getByText(/Current path:/i)).toContain(/Card Form/i);

    await userEvent.click(screen.getByRole('link', { name: 'About Us' }));
    expect(screen.getByText(/Current path:/i)).toContain(/About Us/i);
  });

  test('unknown route', () => {
    const router = createMemoryRouter(routeObject, {
      initialEntries: ['/this-path-does-not-exist'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
