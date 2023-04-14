/** @returns \``${pathname}?${URLSearchParams}`\` */
export const pathnameWithSearch = <SearchParams extends object>(
  pathname: string,
  searchParams: SearchParams
) =>
  `${pathname}?${new URLSearchParams(Object.entries(searchParams)).toString()}`;
