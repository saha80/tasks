import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { renderToPipeableStream } from 'react-dom/server';
import { StrictMode } from 'react';
import * as RTK from '@reduxjs/toolkit';
import type { IncomingHttpHeaders } from 'http';
import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

import { configureStoreOptions } from '@/app/rootReducer';
import { routeObject } from '@/routes/Routes';
import type { Raw } from '@/utils/redux';

const { configureStore } = (RTK as Raw<typeof RTK>).default ?? RTK;

const createFetchHeaders = (httpHeaders: Readonly<IncomingHttpHeaders>) => {
  const headers = new Headers();
  Object.entries(httpHeaders).forEach(([key, values]) => {
    if (Array.isArray(values)) {
      values.forEach((value) => headers.append(key, value));
    } else if (values) {
      headers.set(key, values);
    }
  });
  return headers;
};

// https://reactrouter.com/en/main/guides/ssr#with-a-data-router
const createFetchRequest = (req: Readonly<ExpressRequest>) => {
  const controller = new AbortController();
  req.on('close', () => controller.abort());

  return new Request(
    // Note: This had to take originalUrl into account for presumably vite's proxying
    new URL(
      req.originalUrl || req.url,
      `${req.protocol}://${req.header('host') as string}`
    ),
    {
      method: req.method,
      headers: createFetchHeaders(req.headers),
      signal: controller.signal,
      body:
        req.method === 'GET' || req.method === 'HEAD' // GET or HEAD method cannot have a body
          ? undefined
          : (req.body as BodyInit),
    }
  );
};

const handler = createStaticHandler(routeObject);

export const render = async (
  destination: ExpressResponse,
  /** @description `onPipe` fires after `stream.pipe(destination)`, but before `renderToPipeableStream` calls `destination.end()` */
  onPipe: (destination: ExpressResponse) => void
) => {
  const context = await handler.query(createFetchRequest(destination.req));

  if (context instanceof Response) {
    throw context as unknown;
  }

  const store = configureStore(configureStoreOptions);

  const router = createStaticRouter(handler.dataRoutes, context);

  const stream = renderToPipeableStream(
    <StrictMode>
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>
    </StrictMode>,
    {
      bootstrapScriptContent: `window.__PRELOADED_STATE__=${JSON.stringify(
        structuredClone(store.getState())
      )}`,
      onShellReady: () => onPipe(stream.pipe(destination)),
    }
  );
};
