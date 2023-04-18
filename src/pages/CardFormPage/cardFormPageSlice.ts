import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InputCard } from '@/components/CardForm/CardForm';

const initialState = {
  cards: [] as InputCard[],
};

export const cardFormPageSlice = createSlice({
  name: 'cardFormPage',
  initialState,
  reducers: {
    onSubmit: (state, { payload }: PayloadAction<InputCard>) => {
      state.cards = [payload, ...state.cards];
    },
  },
});

export const { onSubmit } = cardFormPageSlice.actions;
