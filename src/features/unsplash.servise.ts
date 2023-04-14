import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Card, CardDetails } from '@/interfaces/Card';
import {
  PhotoByIdResponse,
  PhotoResponse,
  SearchPhotosParams,
  SearchPhotosResponse,
} from '@/interfaces/Unsplash';
import { pathnameWithSearch } from '@/utils/URL';

const mapToCard = (photo: PhotoResponse): Card => {
  return {
    id: photo.id,
    imgSrc: photo.urls.small,
    imgAlt: photo.alt_description ?? undefined,
    description:
      photo.description ?? photo.alt_description ?? 'No description provided.',
    createdBy: photo.user.username,
    createdByURL: photo.user.links.html,
    creationTimestamp: new Date(photo.created_at).getTime(),
    modificationTimestamp: new Date(photo.updated_at).getTime(),
    likes: photo.likes,
  };
};

const mapToCardDetails = (photo: PhotoByIdResponse): CardDetails => {
  const mapTitle = ({ title }: { title: string }) => title;
  return {
    ...mapToCard(photo),
    collections: photo.related_collections.results.map(mapTitle),
    tags: photo.tags_preview.map(mapTitle),
    publicDomain: Boolean(photo.public_domain),
    location: { country: photo.location.country ?? undefined },
    views: photo.views,
  };
};

const mapToCardList = (photos: PhotoResponse[] | SearchPhotosResponse) =>
  Array.isArray(photos) ? photos.map(mapToCard) : photos.results.map(mapToCard);

export const unsplashApi = createApi({
  reducerPath: 'unsplash',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    headers: new Headers({
      ['Accept-Version']: import.meta.env.VITE_ACCEPT_VERSION,
      ['Authorization']: `Client-ID ${import.meta.env.VITE_ACCESS_KEY}`,
    }),
  }),
  endpoints: (builder) => ({
    getCardList: builder.query<Card[], undefined>({
      query: () => '/photos',
      transformResponse: mapToCardList,
    }),
    getCardById: builder.query<CardDetails, string>({
      query: (id) => `/photos/${id}`,
      transformResponse: mapToCardDetails,
    }),
    getCardListByQuery: builder.query<Card[], SearchPhotosParams>({
      query: (params) => pathnameWithSearch('/search/photos', params),
      transformResponse: mapToCardList,
    }),
  }),
});

export const {
  useGetCardListQuery: useGetCardList,
  useGetCardByIdQuery: useGetCardById,
  useLazyGetCardByIdQuery: useLazyGetCardById,
  useGetCardListByQueryQuery: useGetCardListByQuery,
} = unsplashApi;
