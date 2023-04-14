import { combineReducers } from '@reduxjs/toolkit';

import { unsplashApi } from '@/features/unsplash.servise';

import { search } from '@/pages/Home/components/searchSlice';

export const rootReducer = combineReducers({
  [unsplashApi.reducerPath]: unsplashApi.reducer,
  search: search.reducer,
});
