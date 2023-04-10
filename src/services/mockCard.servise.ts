import { CardService } from '@/interfaces/CardService';

import { CardDetails, Card } from '@/interfaces/Card';
import { cardDetailsList } from 'tests/mockData';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const mockCardService: CardService = {
  getCardList: async (): Promise<Card[]> => {
    await sleep(1000 * Math.random());
    return cardDetailsList;
  },
  getCardListByQuery: async (_, options): Promise<Card[]> => {
    await sleep(1000 * Math.random());
    return cardDetailsList.filter((card) =>
      card.description.toLowerCase().includes(options.query)
    );
  },
  getCardById: async (_, id: string): Promise<CardDetails> => {
    await sleep(1000 * Math.random());
    const card = cardDetailsList.find(({ id: cardId }) => cardId === id);
    if (!card) {
      throw new Error("Couldn't get card by ID");
    }
    return card;
  },
};
