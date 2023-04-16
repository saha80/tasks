export interface Card {
  id: string;
  imgSrc: string;
  imgAlt?: string;
  description: string;
  createdBy: string;
  createdByURL?: string;

  creationTimestamp: number;
  modificationTimestamp: number;
  likes: number;
}

export interface Location {
  country?: string;
}

export interface CardDetails extends Card {
  collections: string[];
  tags: string[];
  publicDomain: boolean;
  location?: Location;
  views: number;
}
