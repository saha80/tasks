import {
  TypedUseSelectorHook,
  useDispatch as baseUseDispatch,
  useSelector as baseUseSelector,
} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { unsplashApiSlice } from '@/services/unsplash.service';

import { rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(unsplashApiSlice.middleware),
});

setupListeners(store.dispatch);

export const useDispatch: () => typeof store.dispatch = baseUseDispatch;

export const useSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = baseUseSelector;
