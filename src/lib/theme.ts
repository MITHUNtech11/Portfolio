import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark';

export interface UseThemeReturn {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const THEME_STORAGE_KEY = 'theme';
export const THEME_CHANGE_EVENT = 'portfolio-theme-change';

/**
 * Resolves current theme from DOM, localStorage, or system media query
 */
export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    if (document.documentElement.classList.contains('dark')) {
      return 'dark';
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch {
    // Fallback if localStorage or matchMedia throws
  }

  return 'light';
}

/**
 * Applies theme class to DOM and synchronizes localStorage + custom event
 */
export function applyTheme(theme: Theme): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const isDark = theme === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.style.colorScheme = theme;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage quota or access errors
  }

  // Dispatch custom event for non-React canvas animations & cross-component sync
  window.dispatchEvent(
    new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme, isDark } })
  );
}

/**
 * useTheme
 *
 * Primary theme state management hook.
 * Synchronizes with DOM root class, localStorage, and system preference changes.
 */
export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Sync state if another component or window event changes the theme
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleThemeEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: Theme }>;
      if (customEvent.detail?.theme && customEvent.detail.theme !== theme) {
        setThemeState(customEvent.detail.theme);
      }
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeEvent);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, handleThemeEvent);
  }, [theme]);

  // Listen to OS system theme changes if user hasn't explicitly saved a choice
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        if (!stored) {
          const systemTheme: Theme = e.matches ? 'dark' : 'light';
          setThemeState(systemTheme);
          applyTheme(systemTheme);
        }
      } catch {
        // Fallback
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setThemeState(nextTheme);
    applyTheme(nextTheme);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
  }, []);

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme,
  };
}
