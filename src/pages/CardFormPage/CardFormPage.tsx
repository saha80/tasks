import { FC } from 'react';

import { CardForm, CardList } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';

import { cardFormPage } from './cardFormPageSlice';

export const CardFormPage: FC = () => {
  const dispatch = useDispatch();
  const { cards } = useSelector((store: RootState) => store.cardFormPage);

  return (
    <div className="card-form-page">
      <h1>Card Form</h1>
      <CardForm onSubmit={dispatch(cardFormPage.actions.onSubmit)} />
      <hr />
      {cards.length ? <CardList>{cards}</CardList> : 'No cards submited.'}
    </div>
  );
};
