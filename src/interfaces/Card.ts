export enum CardVisibilityType {
  ONLY_YOU = 'only-you',
  PUBLIC = 'public',
}

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
  visibility: CardVisibilityType;
  likes: number;
  views: number;
}
