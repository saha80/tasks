import {
  useSelector as baseUseSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import * as RTK from '@reduxjs/toolkit';
import type { ConfigureStoreOptions } from '@reduxjs/toolkit';

import { unsplashApiSlice } from '@/services/unsplash.service';

import { searchSlice } from '@/pages/Home/components/searchSlice';

import { cardFormPageSlice } from '@/pages/CardFormPage/cardFormPageSlice';

import type { Raw } from '@/interfaces/redux';

// https://github.com/reduxjs/redux-toolkit/issues/1960#issuecomment-1022277429
const { combineReducers } = (RTK as Raw<typeof RTK>).default ?? RTK;

export const rootReducer = combineReducers({
  [unsplashApiSlice.reducerPath]: unsplashApiSlice.reducer,
  [searchSlice.name]: searchSlice.reducer,
  [cardFormPageSlice.name]: cardFormPageSlice.reducer,
});

export const configureStoreOptions: ConfigureStoreOptions<
  ReturnType<typeof rootReducer>
> = {
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(unsplashApiSlice.middleware),
};

export const useSelector: TypedUseSelectorHook<ReturnType<typeof rootReducer>> =
  baseUseSelector;
