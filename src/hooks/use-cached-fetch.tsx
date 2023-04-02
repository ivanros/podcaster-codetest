import LRUCache from 'lru-cache';
import { useEffect, useRef, useState } from 'react';

const optionsCache = {
  max: 5,
  // Cache data for 1 day
  ttl: 3600 * 24,
  // return stale items before removing from cache?
  allowStale: true,
  updateAgeOnGet: false,
  updateAgeOnHas: false,
  noDeleteOnStaleGet: true,
};

const cache = new LRUCache(optionsCache);

/**
 * This hook calls an URL with no-CORS validation and returns response and the state
 * By default data is cached by LRU cache system
 * @param reqUrl requested url
 * @param options request options
 * @returns {object} with requested data, loading state and error
 */
export default function useCachedFetch(reqUrl: string, options: RequestInit = {}) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const prevUrl = useRef<string>();

  useEffect(() => {
    if (!reqUrl || prevUrl.current === reqUrl) return;
    // Ensures that url is called only once
    prevUrl.current = reqUrl;
    // Use of allorigins redirection to allow no-CORS external resources
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(reqUrl)}`;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        const json = await response.json();
        const newData = JSON.parse(json.contents);
        cache.set(url, newData);
        setData(newData);
        setLoading(false);
        setError(null);
      } catch (error: unknown) {
        // This catches the error if either of the promises fails or the manual error is thrown
        setLoading(false);
        const message = error instanceof Error ? error.message : 'Unknown error.';
        setError(message);
      }
    };

    // Request is made whenever there is no cached data or TTL time is over
    if (!cache.has(url) || cache.getRemainingTTL(url) <= 0) {
      fetchData();
    } else {
      setData(cache.get(url));
    }
  }, [reqUrl, options]);

  return { data, loading, error };
}
