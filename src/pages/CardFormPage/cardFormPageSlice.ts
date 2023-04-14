import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { CardListProps } from '@/components';
import { InputCard } from '@/components/CardForm/CardForm';

const initialState = {
  cards: [] as CardListProps['children'],
};

export const cardFormPage = createSlice({
  name: 'cardFormPage',
  initialState,
  reducers: {
    onSubmit: (state, action: PayloadAction<InputCard>) => {
      state.cards.unshift({ ...action.payload, id: nanoid() });
    },
  },
});
