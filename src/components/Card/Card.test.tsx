import { render, screen } from '@testing-library/react';

import { Card } from './Card';
import { card } from 'tests/mockData';

describe('Card', () => {
  test('renders', async () => {
    render(<Card {...card} />);

    const [renderedCard] = await screen.findAllByText(card.description);
    expect(renderedCard.innerHTML).toEqual(card.description);
  });
});
