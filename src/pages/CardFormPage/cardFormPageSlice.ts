import type { PayloadAction } from '@reduxjs/toolkit';
import * as RTK from '@reduxjs/toolkit';

import type { InputCard } from '@/components/CardForm/CardForm';

import type { Raw } from '@/interfaces/redux';
// https://github.com/reduxjs/redux-toolkit/issues/1960#issuecomment-1022277429
const { createSlice } = (RTK as Raw<typeof RTK>).default ?? RTK;

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
