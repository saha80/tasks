import { configureStore } from '@reduxjs/toolkit';

import getCardById from '@/features/home/getCardById';
import getCardList from '@/features/home/getCardList';
import getCardListByQuery from '@/features/home/getCardListByQuery';

export const store = configureStore({
  reducer: {
    getCardById,
    getCardList,
    getCardListByQuery,
  },
});
