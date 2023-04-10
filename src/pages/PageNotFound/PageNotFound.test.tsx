import { render, screen } from '@testing-library/react';
import { PageNotFound } from './PageNotFound';

describe('PageNotFound', () => {
  it('renders', () => {
    render(<PageNotFound />);
    const text = /404 Page Not Found/i;
    expect(screen.getByText(text).innerHTML).toMatch(text);
  });
});
