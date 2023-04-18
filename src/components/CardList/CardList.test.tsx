import { render, screen } from '@testing-library/react';

import { cardDetailsList } from 'tests/mockData';

import { CardList } from '@/components';

describe('CardList', () => {
  test('renders', async () => {
    const { container } = render(<CardList>{cardDetailsList}</CardList>);

    const [renderedCard] = await screen.findAllByText(
      cardDetailsList[2].description
    );
    expect(renderedCard.innerHTML).toEqual(cardDetailsList[2].description);

    expect(container.getElementsByClassName('card')).toHaveLength(
      cardDetailsList.length
    );
  });
});
