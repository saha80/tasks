import { Card, CardDetails } from '@/interfaces/Card';
import { CardService } from '@/interfaces/CardService';

import { cardDetailsList } from 'tests/mockData';

const sleep = (milliseconds: number) =>
  new Promise((r) => setTimeout(r, milliseconds));

const randomSleep = () => {
  const minLatency = 100; // unsplash has 100 ms latency on average
  const maxLatency = 1000;
  return sleep(Math.max(minLatency, maxLatency * Math.random()));
};

export const mockCardService: CardService = {
  getCardList: async (): Promise<Card[]> => {
    await randomSleep();
    return cardDetailsList;
  },
  getCardListByQuery: async (_, options): Promise<Card[]> => {
    await randomSleep();
    return cardDetailsList.filter((card) =>
      card.description.toLowerCase().includes(options.query)
    );
  },
  getCardById: async (_, id: string): Promise<CardDetails> => {
    await randomSleep();
    const card = cardDetailsList.find(({ id: cardId }) => cardId === id);
    if (!card) {
      throw new Error("Couldn't get card by ID");
    }
    return card;
  },
};
