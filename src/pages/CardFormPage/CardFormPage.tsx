import { CardProps } from '@/components/Card/Card';
import { CardList, CardListProps } from '@/components/CardList/CardList';
import { Component } from 'react';
import { CardForm } from '@/components/CardForm/CardForm';

interface CardFormPageSate {
  cards: CardListProps['children'];
}

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
        <h1>Card Form</h1>
        <CardForm onSubmit={this.onSubmit} />
        <hr />
        {cards.length ? <CardList>{cards}</CardList> : 'No cards submited.'}
      </div>
    );
  }
}
