import { Card, CardDetails } from '@/interfaces/Card';
import {
  ErrorMessages,
  PhotoByIdResponse,
  PhotoRequestParams,
  PhotoResponse,
  SearchPhotosParams,
  SearchPhotosResponse,
} from '@/interfaces/Unsplash';
import { CardService } from '@/interfaces/CardService';
import { jsonAs } from '@/utils/types';
import { pathnameWithSearch } from '@/utils/URL';

type Method = 'GET';

const fetchApi = (
  method: Method,
  pathname: string,
  signal: AbortSignal,
  searchParams?: object
) =>
  fetch(
    pathnameWithSearch(
      new URL(pathname, import.meta.env.VITE_API_URL),
      searchParams
    ),
    {
      signal,
      method,
      headers: new Headers({
        ['Accept-Version']: import.meta.env.VITE_ACCEPT_VERSION,
        ['Authorization']: `Client-ID ${import.meta.env.VITE_ACCESS_KEY}`,
      }),
    }
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

// todo: retry later or service unavailable
// On each request, your current rate limit status is returned in the response headers:
// X-Ratelimit-Remaining: 999

export const unsplashService: CardService = {
  getCardList: async (signal, params?: PhotoRequestParams) => {
    const response = await fetchApi('GET', '/photos', signal, params);

    if (!response.ok) {
      throw new Error("Couldn't get card list.", {
        cause: await jsonAs<ErrorMessages>(response),
      });
    }

    return mapToCardList(await jsonAs<PhotoResponse[]>(response));
  },
  getCardById: async (signal, id: string) => {
    const response = await fetchApi('GET', `/photos/${id}`, signal);

    if (!response.ok) {
      throw new Error("Couldn't get card by ID.", {
        cause: await jsonAs<ErrorMessages>(response),
      });
    }

    return mapToCardDetails(await jsonAs<PhotoByIdResponse>(response));
  },
  getCardListByQuery: async (signal, params: SearchPhotosParams) => {
    const response = await fetchApi('GET', '/search/photos', signal, params);

    if (!response.ok) {
      throw new Error("Couldn't card list by query.", {
        cause: await jsonAs<ErrorMessages>(response),
      });
    }

    return mapToCardList(await jsonAs<SearchPhotosResponse>(response));
  },
};
