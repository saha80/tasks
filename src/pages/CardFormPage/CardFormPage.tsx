import { CardProps } from '@/components/Card/Card';
import { Cards, CardsProps } from '@/components/Cards/Cards';
import { Component } from 'react';
import { CardForm } from '@/components/CardForm/CardForm';

export type CardFormPageSate = CardsProps;

export class CardFormPage extends Component<
  Record<string, never>,
  CardFormPageSate
> {
  state: CardFormPageSate = {
    cards: [],
  };

  static id = 0;

  onSubmit = (card: Omit<CardProps, 'id'>) => {
    const { cards } = this.state;
    this.setState({ cards: [{ ...card, id: CardFormPage.id++ }, ...cards] });
  };

  render() {
    const { cards } = this.state;

    return (
      <div className="card-form-page">
        <CardForm onSubmit={this.onSubmit} />
        <hr />
        <Cards cards={cards} />
      </div>
    );
  }
}
