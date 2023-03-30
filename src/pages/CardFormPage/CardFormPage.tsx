import { useState, FC } from 'react';

import { CardProps } from '@/components/Card/Card';
import { CardList, CardListProps } from '@/components/CardList/CardList';
import { CardForm } from '@/components/CardForm/CardForm';

export const CardFormPage: FC = () => {
  const [id, setId] = useState(0);
  const [cards, setCards] = useState<CardListProps['children']>([]);

  const onSubmit = (card: Omit<CardProps, 'id'>) => {
    setId((prevId) => prevId + 1);
    setCards((prevCards) => [{ ...card, id }, ...prevCards]);
  };

  return (
    <div className="card-form-page">
      <h1>Card Form</h1>
      <CardForm onSubmit={onSubmit} />
      <hr />
      {cards.length ? <CardList>{cards}</CardList> : 'No cards submited.'}
    </div>
  );
};
