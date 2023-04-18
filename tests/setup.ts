import 'whatwg-fetch'; // polyfill

import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { RESPONSE_STATUS_CODE } from '@/utils/HTTP';
import { cardDetailsList } from './mockUnsplashData';

export const server = setupServer(
  rest.get(
    `${import.meta.env.VITE_API_URL}/photos`,
    (_, responseComposition, context) =>
      responseComposition(
        context.status(RESPONSE_STATUS_CODE.OK),
        context.json(cardDetailsList)
      )
  ),
  rest.get(
    `${import.meta.env.VITE_API_URL}/search/photos`,
    (request, responseComposition, context) => {
      const query = request.url.searchParams.get('query');

      if (typeof query !== 'string') {
        return responseComposition(
          context.status(RESPONSE_STATUS_CODE.BAD_REQUEST),
          context.json({ errors: ['Bad Request'] })
        );
      }

      const lowerCaseQuery = query.toLowerCase();
      return responseComposition(
        context.status(RESPONSE_STATUS_CODE.OK),
        context.json(
          cardDetailsList.filter((card) =>
            [
              card.user.username.toLowerCase().includes(lowerCaseQuery),
              card.description?.toLowerCase().includes(lowerCaseQuery),
              card.alt_description?.toLowerCase().includes(lowerCaseQuery),
              card.location.country?.toLowerCase().includes(lowerCaseQuery),
            ].some(Boolean)
          )
        )
      );
    }
  ),
  rest.get(
    `${import.meta.env.VITE_API_URL}/photos/:photoId`,
    (request, responseComposition, context) => {
      const { photoId } = request.params;

      if (typeof photoId !== 'string') {
        return responseComposition(
          context.status(RESPONSE_STATUS_CODE.BAD_REQUEST),
          context.json({ errors: ['Bad Request'] })
        );
      }

      const response = cardDetailsList.find(({ id }) => id === photoId);
      return response === undefined
        ? responseComposition(
            context.status(RESPONSE_STATUS_CODE.NOT_FOUND),
            context.json({ errors: ["Couldn't find Photo"] })
          )
        : responseComposition(
            context.status(RESPONSE_STATUS_CODE.OK),
            context.json(response)
          );
    }
  )
);

expect.extend(matchers);

afterEach(cleanup);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});
