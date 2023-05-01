import * as RTK from '@reduxjs/toolkit/dist/query/react';
import * as RTKQuery from '@reduxjs/toolkit/dist/query/react';

import type { Raw } from '@/interfaces/redux';
import type { Card, CardDetails } from '@/interfaces/Card';
import type {
  PhotoByIdResponse,
  PhotoResponse,
  SearchPhotosParams,
  SearchPhotosResponse,
} from '@/interfaces/Unsplash';
import { pathnameWithSearch } from '@/utils/URL';

// https://github.com/reduxjs/redux-toolkit/issues/1960#issuecomment-1022277429
const { fetchBaseQuery } = (RTK as Raw<typeof RTK>).default ?? RTK;

const { buildCreateApi, coreModule, reactHooksModule } =
  (RTKQuery as Raw<typeof RTKQuery>).default ?? RTKQuery;

const createApi = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: true })
);

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

export const unsplashApiSlice = createApi({
  reducerPath: 'unsplash',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
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
} = unsplashApiSlice;
