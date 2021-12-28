import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  ThemeProvider as StyledThemeProvider,
  ThemeContext,
} from 'styled-components';
import themes, { ThemeKey } from '$/styles/themes';

const ThemeUpdateContext = createContext<
  ((themeName: ThemeKey) => void) | null
>(null);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, rawSetThemeName] = useState<ThemeKey>('light');

  useEffect(() => {
    rawSetThemeName(getInitialColorMode() as ThemeKey);
  }, []);

  const setThemeName = (value: ThemeKey) => {
    rawSetThemeName(value);
    localStorage.setItem('theme', value);
  };

  const theme = themes[themeName];

  return (
    <ThemeUpdateContext.Provider value={setThemeName}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeUpdateContext.Provider>
  );
};

const useTheme = () => {
  const theme = useContext(ThemeContext);
  const setThemeName = useContext(ThemeUpdateContext);

  const toggleTheme = () => {
    if (setThemeName) {
      const newValue: ThemeKey = theme.name === 'light' ? 'dark' : 'light';
      setThemeName(newValue);
    }
  };

  return { theme, toggleTheme };
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
