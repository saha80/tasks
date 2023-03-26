import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/routes/Routes';
import { AboutUs } from '@/pages/AboutUs/AboutUs';

import { Card, CardProps } from '@/components/Card/Card';
import { Cards, CardsProps } from '@/components/Cards/Cards';

// todo: move to separate file
const card: CardProps = {
  id: 1,
  src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png',
  createdBy: 'Alex',
  creationTimestamp: Date.now(),
  modificationTimestamp: Date.now(),
  title: 'Awesome card about React',
  description: 'Very long card description about created card',
  topics: ['programming'],
  tags: ['react', 'card', 'first card'],
  visibility: 'only-you',
  likes: 10,
  views: 10,
};

const cards: CardsProps = {
  cards: [
    card,
    {
      id: 2,
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Redux.png',
      createdBy: 'Alex',
      creationTimestamp: Date.now(),
      modificationTimestamp: Date.now(),
      title: 'Awesome card about Redux',
      description: 'Very long card description about created card',
      topics: ['programming'],
      tags: ['Redux', 'card'],
      visibility: 'only-you',
      likes: 10,
      views: 10,
    },
    {
      id: 3,
      src: 'https://www.typescriptlang.org/images/branding/two-longform.svg',
      createdBy: 'Alex',
      creationTimestamp: Date.now(),
      modificationTimestamp: Date.now(),
      title: 'Awesome card about Typescript',
      description: 'Very long card description about created card',
      topics: ['programming'],
      tags: ['Typescript', 'card'],
      visibility: 'only-you',
      likes: 10,
      views: 10,
    },
    {
      id: 4,
      src: 'https://www.w3schools.com/css/img_forest.jpg',
      createdBy: 'Alex',
      creationTimestamp: Date.now(),
      modificationTimestamp: Date.now(),
      title: 'Card about forest',
      description: 'Very long card description about created card',
      topics: ['travelling'],
      tags: ['forest', 'card', 'nature'],
      visibility: 'only-you',
      likes: 10,
      views: 10,
    },
    {
      id: 5,
      src: 'https://www.w3schools.com/css/img_mountains.jpg',
      createdBy: 'Alex',
      creationTimestamp: Date.now(),
      modificationTimestamp: Date.now(),
      title: 'Card about Mountains',
      description: 'Very long card description about created card',
      topics: ['travelling'],
      tags: ['mountains', 'card', 'nature'],
      visibility: 'only-you',
      likes: 10,
      views: 10,
    },
  ],
};

describe('App', () => {
  test('renders', () => {
    render(<RouterProvider router={router} />);

    screen.debug();
  });

  test('Cards', () => {
    render(<Card {...card} />);

    screen.debug();
  });

  test('Card', async () => {
    render(<Cards {...cards} />);

    screen.debug();
  });

  test('AboutUs', () => {
    render(<AboutUs />);

    screen.debug();
  });
});
