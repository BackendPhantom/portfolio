import { useState, useLayoutEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedTheme = localStorage.getItem('theme') as Theme | null;
        if (storedTheme) {
          return storedTheme;
        }
      } catch {
        // Silently fail if storage access is blocked (e.g., strict privacy mode)
      }
      
      // Check system preferences if no local storage value exists or access failed
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useLayoutEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Silently fail if storage is full or blocked
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return { theme, toggleTheme };
}