const CACHE_TIME = 86400; // 1 day in milliseconds

/**
 * Stores data to local storage with expiration time
 * @param key identifier of data to store
 * @returns {void}
 */
export function setCachedStorage(key: string, value: any) {
  const item = {
    value,
    expiry: Date.now() + CACHE_TIME,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

/**
 * Retrieves cached data from local storage if TTL has not expired
 * @param key identifier of cached data
 * @returns {object} cached data or null if it does not exists or is expired
 */
export function getCachedStorage(key: string) {
  const cachedDataStr = localStorage.getItem(key);
  if (!cachedDataStr) return null;
  const cachedData = JSON.parse(cachedDataStr);
  if (Date.now() > cachedData.expiry) {
    // If the item is expired, delete the item from storage
    localStorage.removeItem(key);
    return null;
  }
  return cachedData.value;
}
