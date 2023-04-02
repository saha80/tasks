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
  topics: string[];
  tags: string[];
  visibility: CardVisibilityType;
  likes: number;
  views: number;
}
