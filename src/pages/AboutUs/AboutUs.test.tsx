import { render, screen } from '@testing-library/react';

import { AboutUs } from './AboutUs';

describe('AboutUs', () => {
  test('renders', () => {
    render(<AboutUs />);

    screen.debug();
  });
});
