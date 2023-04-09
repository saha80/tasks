import { render, screen } from '@testing-library/react';

import { cards } from 'tests/mockData';

import { CardList } from './CardList';

describe('CardList', () => {
  test('renders', async () => {
    const { container } = render(<CardList {...cards} />);

    const [renderedCard] = await screen.findAllByText(
      cards.children[2].description
    );
    expect(renderedCard.innerHTML).toEqual(cards.children[2].description);

    expect(container.getElementsByClassName('card')).toHaveLength(
      cards.children.length
    );
  });
});
