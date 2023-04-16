import { render, screen } from '@testing-library/react';

import { AboutUs } from './AboutUs';

describe('AboutUs', () => {
  test('renders', () => {
    render(<AboutUs />);
    const text = /The Rolling Scopes/i;
    expect(screen.getByText(text).innerHTML).toMatch(text);
  });
});
