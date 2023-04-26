import * as RTK from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Raw } from '@/utils/redux';

// https://github.com/reduxjs/redux-toolkit/issues/1960#issuecomment-1022277429
const { createSlice } = (RTK as Raw<typeof RTK>).default ?? RTK;

const initialState = {
  searchValue: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    onSearch: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { onSearch } = searchSlice.actions;
