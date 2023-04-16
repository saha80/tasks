import { combineReducers } from '@reduxjs/toolkit';

import { unsplashApiSlice } from '@/services/unsplash.service';

import { searchSlice } from '@/pages/Home/components/searchSlice';

import { cardFormPageSlice } from '@/pages/CardFormPage/cardFormPageSlice';

export const rootReducer = combineReducers({
  [unsplashApiSlice.reducerPath]: unsplashApiSlice.reducer,
  search: searchSlice.reducer,
  cardFormPage: cardFormPageSlice.reducer,
});
