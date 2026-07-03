import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme() {
  // 1. Lazy initialization: This function only runs once during the initial mount.
  // It synchronously grabs the correct theme before the first render happens.
  const [theme, setTheme] = useState<Theme>(() => {
    // Ensure we are in a browser environment
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      if (storedTheme) {
        return storedTheme;
      }
      // Check system preferences if no local storage value exists
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    // Fallback default
    return 'light';
  });

  // 2. We only need one effect to handle DOM updates and saving to localStorage 
  // whenever the theme state actually changes.
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}