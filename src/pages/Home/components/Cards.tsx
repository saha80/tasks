import { CardList } from '@/components';
import { cardListWithService } from '@/hoc/cardListWithService';
import { cardListDetailsWithService } from '@/hoc/cardListDetailsWithService';
import { unsplashService } from '@/services/unsplash.servise';

const CardListWithService = cardListWithService(CardList, unsplashService);

export const Cards = cardListDetailsWithService(
  CardListWithService,
  unsplashService
);
