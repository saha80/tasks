import { render, screen } from '@testing-library/react';

import { Cards } from '@/components/Cards/Cards';
import { cards } from 'tests/mockData';

describe('Cards', () => {
  test('renders', async () => {
    render(<Cards {...cards} />);

    const [renderedCard] = await screen.findAllByText(cards.cards[2].title);
    expect(renderedCard.innerHTML).toEqual(cards.cards[2].title);

    screen.debug();
  });
});
