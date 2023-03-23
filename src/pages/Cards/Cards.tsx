import { Component } from 'react';

import { Search } from '@/components/Search/Search';
import { FetchingError } from '@/components/FetchingError/FetchingError';
import { FetchingSpinner } from '@/components/FetchingSpinner/FetchingSpinner';
import { Card, CardProps } from '@/components/Card/Card';

import { getCards } from '@/services/Card';

import './Cards.css';
import { CardsContext } from './CardsContext';

export interface CardsState {
  cards: Array<CardProps>;
  loading: boolean;
  error: boolean;
}

export class Cards extends Component<Record<string, never>, CardsState> {
  state: CardsState = {
    cards: [],
    loading: true, // todo: add hoc withLoading
    error: false,
  };

  async componentDidMount() {
    try {
      const cards = await getCards();

      this.setState({
        cards: cards.map(({ imgSrc, ...other }) => ({ src: imgSrc, ...other })),
      });
    } catch (_) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, error, cards } = this.state;

    if (loading) {
      return <FetchingSpinner />;
    }

    if (error) {
      return <FetchingError />;
    }

    return (
      <div className="search-cards">
        <Search />
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
      </div>
    );
  }
}
