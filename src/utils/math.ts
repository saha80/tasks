/** @description make sure that value is in [`min`, `max`] range */
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
