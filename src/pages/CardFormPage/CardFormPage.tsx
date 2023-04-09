import { useState, FC, useCallback } from 'react';

import { CardList, CardListProps, CardForm, CardFormProps } from '@/components';

export const CardFormPage: FC = () => {
  const [cards, setCards] = useState<CardListProps['children']>([]);

  const onSubmit: CardFormProps['onSubmit'] = useCallback((card) => {
    setCards((prevCards) => [
      {
        ...card,
        id: String(Math.max(...prevCards.map(({ id }) => Number(id))) + 1),
      },
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
