import { render, screen } from '@testing-library/react';

import { Card } from './Card';
import { cardDetails } from 'tests/mockData';

describe('Card', () => {
  test('renders', async () => {
    render(<Card {...cardDetails} />);

    const [renderedCard] = await screen.findAllByText(cardDetails.description);
    expect(renderedCard.innerHTML).toEqual(cardDetails.description);
  });
});
