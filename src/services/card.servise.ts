import { Card, CardVisibilityType } from '@/interfaces/Card';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const CardService = {
  get: async (): Promise<Card[]> => {
    await sleep(1000 * Math.random());
    return [
      {
        id: 1,
        imgSrc:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png',
        createdBy: 'Alex',
        creationTimestamp: Date.now(),
        modificationTimestamp: Date.now(),
        title: 'Awesome card about React',
        description: 'Very long card description about created card',
        topics: ['programming'],
        tags: ['react', 'card', 'first card'],
        visibility: CardVisibilityType.ONLY_YOU,
        likes: 10,
        views: 10,
      },
      {
        id: 2,
        imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Redux.png',
        createdBy: 'Alex',
        creationTimestamp: Date.now(),
        modificationTimestamp: Date.now(),
        title: 'Awesome card about Redux',
        description: 'Very long card description about created card',
        topics: ['programming'],
        tags: ['Redux', 'card'],
        visibility: CardVisibilityType.ONLY_YOU,
        likes: 10,
        views: 10,
      },
      {
        id: 3,
        imgSrc:
          'https://www.typescriptlang.org/images/branding/two-longform.svg',
        createdBy: 'Alex',
        creationTimestamp: Date.now(),
        modificationTimestamp: Date.now(),
        title: 'Awesome card about Typescript',
        description: 'Very long card description about created card',
        topics: ['programming'],
        tags: ['Typescript', 'card'],
        visibility: CardVisibilityType.ONLY_YOU,
        likes: 10,
        views: 10,
      },
      {
        id: 4,
        imgSrc: 'https://www.w3schools.com/css/img_forest.jpg',
        createdBy: 'Alex',
        creationTimestamp: Date.now(),
        modificationTimestamp: Date.now(),
        title: 'Card about forest',
        description: 'Very long card description about created card',
        topics: ['travelling'],
        tags: ['forest', 'card', 'nature'],
        visibility: CardVisibilityType.ONLY_YOU,
        likes: 10,
        views: 10,
      },
      {
        id: 5,
        imgSrc: 'https://www.w3schools.com/css/img_mountains.jpg',
        createdBy: 'Alex',
        creationTimestamp: Date.now(),
        modificationTimestamp: Date.now(),
        title: 'Card about Mountains',
        description: 'Very long card description about created card',
        topics: ['travelling'],
        tags: ['mountains', 'card', 'nature'],
        visibility: CardVisibilityType.ONLY_YOU,
        likes: 10,
        views: 10,
      },
    ];
  },
};
