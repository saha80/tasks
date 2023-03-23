import { Card } from '@/interfaces/Card';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const getCards = async (): Promise<Array<Card>> => {
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
      tags: ['react', 'card', 'first card'],
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
      tags: ['Redux', 'card'],
      likes: 10,
      views: 10,
    },
    {
      id: 3,
      imgSrc: 'https://www.typescriptlang.org/images/branding/two-longform.svg',
      createdBy: 'Alex',
      creationTimestamp: Date.now(),
      modificationTimestamp: Date.now(),
      title: 'Awesome card about Typescript',
      description: 'Very long card description about created card',
      tags: ['Typescript', 'card'],
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
      tags: ['forest', 'card', 'nature'],
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
      tags: ['mountains', 'card', 'nature'],
      likes: 10,
      views: 10,
    },
  ];
};
