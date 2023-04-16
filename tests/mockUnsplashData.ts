import * as Unsplash from '@/interfaces/Unsplash';

const created_at = '2023-04-13T11:31:39.840Z';
const updated_at = '2023-04-13T12:00:00.000Z';

export const cardDetailsList: Unsplash.PhotoByIdResponse[] = [
  {
    id: '1',
    urls: {
      small:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png',
    },
    user: {
      username: 'Alex',
      links: { html: '' },
    } as Unsplash.User,
    created_at,
    updated_at,
    description: 'Very long card description about React card',
    related_collections: {
      type: 'collected',
      results: [
        {
          title: 'programming',
        } as Unsplash.Collection,
      ],
      total: 1,
    },
    tags_preview: [
      { title: 'React' },
      { title: 'card' },
      { title: 'first card' },
    ],
    public_domain: false,
    likes: 10,
    views: 10,
    location: { country: null },
    alt_description: null,
    height: 0,
    links: {} as Unsplash.Links,
    width: 0,
  },
  {
    id: '2',
    urls: {
      small: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Redux.png',
    },
    user: {
      username: 'Alex',
      links: { html: '' },
    } as Unsplash.User,
    created_at,
    updated_at,
    description: 'Awesome card about Redux',
    related_collections: {
      type: 'collected',
      results: [
        {
          title: 'programming',
        } as Unsplash.Collection,
      ],
      total: 1,
    },
    tags_preview: [{ title: 'Redux' }, { title: 'card' }],
    public_domain: false,
    likes: 10,
    views: 10,
    location: { country: null },
    alt_description: null,
    height: 0,
    links: {} as Unsplash.Links,
    width: 0,
  },
  {
    id: '3',
    urls: {
      small: 'https://www.typescriptlang.org/images/branding/two-longform.svg',
    },
    user: {
      username: 'Alex',
      links: { html: '' },
    } as Unsplash.User,
    created_at,
    updated_at,
    description: 'Awesome card about Typescript',
    related_collections: {
      type: 'collected',
      results: [
        {
          title: 'programming',
        } as Unsplash.Collection,
      ],
      total: 1,
    },
    tags_preview: [{ title: 'Typescript' }, { title: 'card' }],
    public_domain: false,
    likes: 10,
    views: 10,
    location: { country: null },
    alt_description: null,
    height: 0,
    links: {} as Unsplash.Links,
    width: 0,
  },
  {
    id: '4',
    urls: {
      small: 'https://www.w3schools.com/css/img_forest.jpg',
    },
    user: {
      username: 'Alex',
      links: { html: '' },
    } as Unsplash.User,
    created_at,
    updated_at,
    description: 'Card about forest',
    related_collections: {
      type: 'collected',
      results: [
        {
          title: 'nature',
        } as Unsplash.Collection,
      ],
      total: 1,
    },
    tags_preview: [{ title: 'forest' }, { title: 'card' }],
    public_domain: false,
    likes: 10,
    views: 10,
    location: { country: 'far far away' },
    alt_description: null,
    height: 0,
    links: {} as Unsplash.Links,
    width: 0,
  },
  {
    id: '5',
    urls: {
      small: 'https://www.w3schools.com/css/img_mountains.jpg',
    },
    user: {
      username: 'Alex',
      links: { html: '' },
    } as Unsplash.User,
    created_at,
    updated_at,
    description: 'Card about Mountains',
    related_collections: {
      type: 'collected',
      results: [
        {
          title: 'nature',
        } as Unsplash.Collection,
      ],
      total: 1,
    },
    tags_preview: [{ title: 'mountains' }, { title: 'card' }],
    public_domain: false,
    likes: 10,
    views: 10,
    location: { country: null },
    alt_description: null,
    height: 0,
    links: {} as Unsplash.Links,
    width: 0,
  },
];
