const SearchStorageKey = 'search-input-value';

export const searchLocalStorage = {
  get: () => window.localStorage.getItem(SearchStorageKey),
  set: (value: string) => window.localStorage.setItem(SearchStorageKey, value),
};
