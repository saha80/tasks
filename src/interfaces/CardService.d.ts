import { Card, CardDetails } from './Card';

export interface CardService {
  getCardById: (signal: AbortSignal, id: string) => Promise<CardDetails>;
  getCardList: (signal: AbortSignal, options?: object) => Promise<Card[]>;
  getCardListByQuery: (
    signal: AbortSignal,
    options: { query: string }
  ) => Promise<Card[]>;
}
