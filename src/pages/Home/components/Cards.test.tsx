import { render, screen } from '@testing-library/react';

import { Cards } from './Cards';

describe('Cards with service', () => {
  test('renders', () => {
    render(<Cards />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
