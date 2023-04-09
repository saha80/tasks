export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** @summary type casting for `Response.prototype.json()`. You are NOT changing underlying JSON */
export const jsonAs = <T>(response: Response) => response.json() as Promise<T>;
