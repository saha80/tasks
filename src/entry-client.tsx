import { hydrateRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import * as RTK from '@reduxjs/toolkit';

import { routeObject } from '@/routes/Routes';

import { configureStoreOptions, type rootReducer } from '@/app/rootReducer';

import './index.css';

import type { Raw } from '@/interfaces/redux';

// https://github.com/reduxjs/redux-toolkit/issues/1960#issuecomment-1022277429
const { configureStore } = (RTK as Raw<typeof RTK>).default ?? RTK;

declare global {
  interface Window {
    __PRELOADED_STATE__?: ReturnType<typeof rootReducer>;
  }
}

const store = configureStore({
  ...configureStoreOptions,
  preloadedState: window.__PRELOADED_STATE__,
});

setupListeners(store.dispatch);

const router = createBrowserRouter(routeObject);

hydrateRoot(
  document.getElementById('root') as Element,
  <StrictMode>
    <Provider store={store} serverState={window.__PRELOADED_STATE__}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
