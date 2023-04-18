import { cardDetailsList } from 'tests/mockUnsplashData';

describe('service', () => {
  test('getCardList', async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/photos`);
    expect(await response.json()).toStrictEqual(cardDetailsList);
  });

  test('getCardById', async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/photos/1`);
    expect(await response.json()).toStrictEqual(cardDetailsList[0]);
  });

  test('getCardListByQuery', async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/search/photos?query=react`
    );
    expect(await response.json()).toStrictEqual([cardDetailsList[0]]);
  });
});
