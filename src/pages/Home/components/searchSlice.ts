import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
};

export const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    onSearch: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});
