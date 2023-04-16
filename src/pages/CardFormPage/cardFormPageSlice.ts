import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { CardListProps } from '@/components';
import { InputCard } from '@/components/CardForm/CardForm';

const initialState = {
  cards: [] as CardListProps['children'],
};

export const cardFormPageSlice = createSlice({
  name: 'cardFormPage',
  initialState,
  reducers: {
    onSubmit: (state, { payload }: PayloadAction<InputCard>) => {
      state.cards = [{ ...payload, id: nanoid() }, ...state.cards];
    },
  },
});

export const { onSubmit } = cardFormPageSlice.actions;
