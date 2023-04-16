import { FC } from 'react';

import { CardForm, CardList } from '@/components';
import { useDispatch, useSelector } from '@/app/store';

import { cardFormPageSlice } from './cardFormPageSlice';

export const CardFormPage: FC = () => {
  const dispatch = useDispatch();
  const { cards } = useSelector((store) => store.cardFormPage);

  return (
    <div className="card-form-page">
      <h1>Card Form</h1>
      <CardForm
        onSubmit={(card) => {
          dispatch(cardFormPageSlice.actions.onSubmit(card));
        }}
      />
      <hr />
      {cards.length ? <CardList>{cards}</CardList> : 'No cards submited.'}
    </div>
  );
};
