import { Component } from 'react';

import { Card, CardProps } from '@/components/Card/Card';

import { getCards } from '@/services/Card';

import './Cards.css';
import { CardsContext } from './CardsContext';

export interface CardsState {
  searchValue: string | null;
  cards: Array<CardProps>;
}

export class Cards extends Component<Record<string, never>, CardsState> {
  state: CardsState = {
    searchValue: null,
    cards: [],
  };

  componentDidMount(): void {
    getCards().then((cards) => {
      this.setState({ cards });
    });
  }

  render() {
    const { cards } = this.state;
    return (
      <div className="cards">
        <CardsContext.Consumer>
          {({ filterBy, searchValue }) =>
            cards
              .filter((card) =>
                card[filterBy].toLowerCase().includes((searchValue ?? '').toLowerCase())
              )
              .map((card) => <Card key={card.id} {...card} />)
          }
        </CardsContext.Consumer>
      </div>
    );
  }
}
