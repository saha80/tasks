import { combineReducers } from '@reduxjs/toolkit';

import { unsplashApi } from '@/features/unsplash.servise';

import { search } from '@/pages/Home/components/searchSlice';

import { cardFormPage } from '@/pages/CardFormPage/cardFormPageSlice';

export const rootReducer = combineReducers({
  [unsplashApi.reducerPath]: unsplashApi.reducer,
  search: search.reducer,
  cardFormPage: cardFormPage.reducer,
});
