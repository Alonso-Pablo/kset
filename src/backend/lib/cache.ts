import { redis } from "./redis";

export const fetch = async <T>(key: string, fetcher: () => T, expires: number) => {
  const existing = await get<T>(key);
  if (existing !== null) return existing;
  return set(key, fetcher, expires);
};

export const get = async <T>(key: string): Promise<T | null> => {
  const value = await redis.get(key);
  if (value === null) return null
  return JSON.parse(value)
};

export const set = async <T>(key: string, fetcher: () => T, expires: number) => {
  const value = await fetcher()
  await redis.set(key, JSON.stringify(value), "EX", expires)
  return value
};

export const del = async (key: string) => {
  await redis.del(key)
}

// export default { fetch, set, get, del }
