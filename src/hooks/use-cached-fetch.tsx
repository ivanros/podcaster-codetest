import { useEffect, useRef, useState } from 'react';
import { getCachedStorage, setCachedStorage } from '../utils/cached-storage';

const PROXY_API_URL = 'https://api.allorigins.win';

/**
 * This hook calls an URL with no-CORS validation and returns response and the state
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
    const url = `${PROXY_API_URL}/get?url=${encodeURIComponent(reqUrl)}`;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Sets no-store cache so our localStorage can handle it by itself
        const response = await fetch(url, { ...options, cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        const json = await response.json();
        const parsedData = JSON.parse(json.contents);
        setCachedStorage(reqUrl, parsedData);
        setData(parsedData);
        setError(null);
      } catch (error: unknown) {
        // This catches the error if either of the promises fails or the manual error is thrown
        const message = error instanceof Error ? error.message : 'Unknown error.';
        setError(message);
      }
      setLoading(false);
    };

    const cachedData = getCachedStorage(reqUrl);
    if (cachedData === null) {
      fetchData();
    } else {
      setData(cachedData);
    }
  }, [reqUrl, options]);

  return { data, loading, error };
}
