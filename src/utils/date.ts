export const toDateInputMinFormat = (date: Date): string => {
  const millisecondsInMinute = 60 * 1000;

  return new Date(
    date.getTime() - date.getTimezoneOffset() * millisecondsInMinute
  )
    .toISOString() // YYYY-MM-DDTHH:mm:ss.sssZ
    .split('T')[0];
};
