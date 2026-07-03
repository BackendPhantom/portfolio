import { useState, useEffect } from 'react';
import { type PortfolioData } from '../types';

// Global cache variables outside the component scope
let globalDataCache: PortfolioData | null = null;
let globalFetchPromise: Promise<PortfolioData> | null = null;

export function usePortfolioData() {
  // Initialize with global cache if it exists, bypassing the loading state for immediate renders
  const [data, setData] = useState<PortfolioData | null>(globalDataCache);
  const [isLoading, setIsLoading] = useState<boolean>(!globalDataCache);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (isBackgroundSync = false) => {
      try {
        // Only trigger the UI loading state if we don't already have data
        if (!isBackgroundSync && !globalDataCache) {
          setIsLoading(true);
        }
        
        // SINGLETON PROMISE: If a fetch is already in flight, don't start a new one.
        // This prevents the 4 components from triggering 4 simultaneous network requests.
        if (!globalFetchPromise) {
          // Append a timestamp in development mode to bypass the browser's disk cache
          // Assumes you are using Vite. If Webpack/CRA, use process.env.NODE_ENV === 'development'
          const isDev = import.meta.env?.DEV; 
          const cacheBuster = isDev ? `?t=${Date.now()}` : '';
          
          globalFetchPromise = fetch(`/data.json${cacheBuster}`).then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
          });
        }

        // All 4 components await the exact same promise instance
        const jsonData: PortfolioData = await globalFetchPromise;
        globalDataCache = jsonData; // Update the global cache
        
        if (isMounted) {
          setData(jsonData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch data'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
        // Clear the promise lock so future background syncs trigger a fresh network request
        setTimeout(() => { globalFetchPromise = null; }, 50); 
      }
    };

    // 1. Initial execution on mount
    fetchData();

    // 2. The "Live API" trigger: Sync data seamlessly when the browser regains focus
    const handleFocus = () => {
      fetchData(true); // true = background sync (no loading spinners)
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return { data, isLoading, error };
}