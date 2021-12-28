import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import type { ThemeKey } from '$/styles/themes';

const ThemeUpdateContext = createContext<{
  themeName: ThemeKey;
  setThemeName: (value: 'light' | 'dark') => void;
}>({ themeName: 'light', setThemeName: () => null });

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, rawSetThemeName] = useState<ThemeKey>('light');

  useEffect(() => {
    const initialValue = getInitialColorMode() as ThemeKey;
    if (initialValue === 'dark') {
      document.querySelector('html')?.classList.add('dark');
    } else {
      document.querySelector('html')?.classList.remove('dark');
    }
  }, []);

  const setThemeName = (value: ThemeKey) => {
    rawSetThemeName(value);
    localStorage.setItem('theme', value);
  };

  return (
    <ThemeUpdateContext.Provider value={{ themeName, setThemeName }}>
      {children}
    </ThemeUpdateContext.Provider>
  );
};

const useTheme = () => {
  const { themeName, setThemeName } = useContext(ThemeUpdateContext);

  const toggleTheme = () => {
    if (setThemeName) {
      const newValue: ThemeKey = themeName === 'light' ? 'dark' : 'light';
      setThemeName(newValue);

      if (newValue === 'dark') {
        document.querySelector('html')?.classList.add('dark');
      } else {
        document.querySelector('html')?.classList.remove('dark');
      }
    }
  };

  return { themeName, toggleTheme };
};

export { ThemeProvider, useTheme };

function getInitialColorMode() {
  const persistedColorPreference = window.localStorage.getItem('theme');
  const hasPersistedPreference = typeof persistedColorPreference === 'string';

  if (hasPersistedPreference) {
    return persistedColorPreference;
  }
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const hasMediaQueryPreference = typeof mql.matches === 'boolean';
  if (hasMediaQueryPreference) {
    return mql.matches ? 'dark' : 'light';
  }
  return 'light';
}
