import { useState, FC, useCallback } from 'react';

import { CardProps, CardList, CardListProps, CardForm } from '@/components';

export const CardFormPage: FC = () => {
  const [cards, setCards] = useState<CardListProps['children']>([]);

  const onSubmit = useCallback((card: Omit<CardProps, 'id'>) => {
    setCards((prevCards) => [
      { ...card, id: Math.max(...prevCards.map(({ id }) => id)) + 1 },
      ...prevCards,
    ]);
  }, []);

  return (
    <div className="card-form-page">
      <h1>Card Form</h1>
      <CardForm onSubmit={onSubmit} />
      <hr />
      {cards.length ? <CardList>{cards}</CardList> : 'No cards submited.'}
    </div>
  );
};
