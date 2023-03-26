import { FC } from 'react';
import { Search } from '@/components/Search/Search';
import { Cards as BaseCards } from '@/components/Cards/Cards';
import { withService } from '@/hoc/withService';
import { getCards } from '@/services/Card';

const Cards = withService(BaseCards, getCards, (service) => ({
  cards: service.map(({ imgSrc, ...other }) => ({ src: imgSrc, ...other })),
}));

export const Home: FC = () => (
  <div className="search-cards">
    <Search />
    <Cards />
  </div>
);
