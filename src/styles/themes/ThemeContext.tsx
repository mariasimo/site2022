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
import useLocalStorage from '../../common/hooks/useLocalStorage';

const ThemeUpdateContext = createContext<
  ((themeName: ThemeKey) => void) | null
>(null);

const useMatchMedia = () => {
  const [colorScheme, setColorScheme] = useState<ThemeKey>('light');
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';

    if (hasMediaQueryPreference) {
      setColorScheme(mql.matches ? 'dark' : 'light');
    } else {
      // If they are using a browser/OS that doesn't support
      // color themes, let's default to 'light'.
      setColorScheme('light');
    }
  }, [setColorScheme]);

  return colorScheme;
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const initialValue = useMatchMedia();
  const [themeName, setThemeName] = useLocalStorage<ThemeKey>(
    'theme',
    initialValue,
  );
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
