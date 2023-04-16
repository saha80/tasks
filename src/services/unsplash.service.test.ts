import EventEmitter from 'events';
import { cardDetailsList } from 'tests/mockUnsplashData';

describe('service', () => {
  test('getCardList', async () => {
    const response = await fetch(import.meta.env.VITE_API_URL + '/photos');
    expect(await response.json()).toEqual(cardDetailsList);
  });
  test('jsdom AbortSignal does not work with fetch', async () => {
    try {
      const abortCtrl = new AbortController();

      expect(
        abortCtrl instanceof EventEmitter || abortCtrl instanceof EventTarget
      ).not.toBeTruthy();

      const response = await fetch(import.meta.env.VITE_API_URL + '/photos', {
        signal: abortCtrl.signal,
      });

      expect(await response.json()).toEqual([]); // todo: create issue on jsdom gihub repo
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);

      expect((error as TypeError).message).toBe(
        'The "emitter" argument must be an instance of EventEmitter or EventTarget. Received an instance of AbortSignal'
      );
    }
  });
});
