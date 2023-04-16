/** @returns `pathname` | \``${pathname}?${URLSearchParams}`\` */
export const pathnameWithSearch = <SearchParams extends object>(
  pathname: string | URL,
  searchParams: SearchParams | undefined
) =>
  searchParams
    ? `${pathname.toString()}?${new URLSearchParams(
        Object.entries(searchParams)
      ).toString()}`
    : pathname;
