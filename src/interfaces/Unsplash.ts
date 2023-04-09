// todo: split into different files

export interface ErrorMessages {
  errors: string[];
}

export interface Links {
  /** @summary API location */
  self: string;
  /** @summary href location */
  html: string;
}

export interface Location {
  country: string | null;
}

export interface User {
  id: string;
  name: string;
  username: string;
  first_name: string;
  links: Links;
  profile_image: {
    small: string;
  };
  updated_at: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string | null;
  links: Links;
  last_collected_at: string;
  published_at: string;
  updated_at: string;
  total_photos: number;
  user: User;
}

export interface PhotoRequestParams {
  /** @summary Page number to retrieve. @default 1 */
  page?: number;
  /** @summary Number of items per page. @default 10 */
  per_page?: number;
  /** @summary How to sort the photos. @default 'latest' */
  order_by?: 'latest' | 'oldest' | 'popular';
}

export interface BasePhotoResponse {
  id: string;
  created_at: string;
  updated_at: string;
  urls: {
    /** @summary photo in jpg format with a width of 400 pixels. */
    small: string;
  };
}

export interface PhotoResponse extends BasePhotoResponse {
  alt_description: string | null;
  description: string | null;
  height: number;
  likes: number;
  links: Links;
  width: number;
  user: User;
}

export interface PhotoByIdResponse extends PhotoResponse {
  related_collections: {
    type: 'related' | 'collected';
    results: Collection[];
    total: number;
  };
  location: Location;
  public_domain?: boolean;
  views: number;
  tags_preview: { title: string }[];
}

interface BaseSearchParams {
  query: string;
  /** @summary Page number to retrieve. @default 1 */
  page?: number;
  /** @summary Number of items per page. @default: 10 */
  per_page?: number;
}

export type SearchUserParams = BaseSearchParams;

export interface SearchPhotosParams extends BaseSearchParams {
  /** @summary How to sort the photos. @default 'relevant' */
  order_by?: 'latest' | 'relevant';
  /** @summary Filter by photo orientation. */
  orientation?: 'landscape' | 'portrait' | 'squarish';
}

export interface SearchPhotosResponse {
  results: PhotoResponse[];
}
