import { useState, useEffect } from 'react';
import { type PortfolioData } from '../types';

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Stable URL allows the browser to coalesce simultaneous requests 
        // and utilize standard HTTP caching
        const response = await fetch('/data.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const jsonData: PortfolioData = await response.json();
        
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
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error };
}