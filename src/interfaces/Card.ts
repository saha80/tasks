export interface Card {
  id: number;
  imgSrc: string;
  title: string;
  description: string;
  createdBy: string;
  creationTimestamp: number;
  modificatoinTimestamp: number;
  tags: Array<string>;
  likes: number;
  views: number;
}
