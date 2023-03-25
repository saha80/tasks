export interface Card {
  id: number;
  imgSrc: string;
  title: string;
  description: string;
  createdBy: string;
  creationTimestamp: number;
  modificationTimestamp: number;
  topics: Array<string>;
  tags: Array<string>;
  visibility: 'only-you' | 'you-and-friends' | 'public';
  likes: number;
  views: number;
}
