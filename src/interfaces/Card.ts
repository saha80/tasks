export interface Card {
  id: number;
  imgSrc: string;
  title: string;
  description: string;
  createdBy: string;
  creationTimestamp: number;
  modificationTimestamp: number;
  tags: Array<string>;
  likes: number;
  views: number;
}
