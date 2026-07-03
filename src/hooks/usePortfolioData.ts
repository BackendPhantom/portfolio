import { useState, useEffect } from 'react';
import { type PortfolioData } from '../types';

interface UsePortfolioDataResult {
  data: PortfolioData | null;
  isLoading: boolean;
  error: string | null;
}

export function usePortfolioData(): UsePortfolioDataResult {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cache-busting: Appending a unique timestamp forces the browser to fetch fresh data
        const timestamp = new Date().getTime();
        const response = await fetch(`/data.json?t=${timestamp}`, {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const jsonData = (await response.json()) as PortfolioData;
        setData(jsonData);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
}