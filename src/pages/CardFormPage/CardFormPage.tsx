import { type FC } from 'react';
import { useDispatch } from 'react-redux';

import { CardForm } from '@/components/CardForm/CardForm';
import { Card } from '@/components/Card/Card';
import { useSelector } from '@/app/rootReducer';
import cardListStyles from '@/components/CardList/CardList.module.css';

import { onSubmit } from './cardFormPageSlice';

import styles from './CardFormPage.module.css';

export const CardFormPage: FC = () => {
  const dispatch = useDispatch();
  const { cards } = useSelector((store) => store.cardFormPage);

  return (
    <div className="card-form-page">
      <h1>Card Form</h1>
      <CardForm
        onSubmit={(card) => {
          dispatch(onSubmit(card));
        }}
      />
      <hr />
      {cards.length ? (
        <div className={cardListStyles.cardList}>
          {cards.map((card) => (
            <Card key={card.id} {...card}>
              <div className={styles.card}>
                <p>Collection: {card.collection}</p>
                <p>Tags: {card.tags}</p>
                <p>Visibility: {card.visibility.split('-').join(' ')}</p>
                <p>
                  Allow process data: {card.allowProcessData ? 'Yes' : 'No'}
                </p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        'No cards submited.'
      )}
    </div>
  );
};

export default CardFormPage;
