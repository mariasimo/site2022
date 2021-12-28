import { createContext, ReactNode, useContext, useEffect } from 'react';
import {
  ThemeProvider as StyledThemeProvider,
  ThemeContext,
} from 'styled-components';
import themes, { ThemeKey } from '$/styles/themes';
import useLocalStorage from '$/common/hooks/useLocalStorage';
import useMatchMedia from '$/common/hooks/useMatchMedia';

const ThemeUpdateContext = createContext<
  ((themeName: ThemeKey) => void) | null
>(null);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorModePreference = useMatchMedia();
  const [themeName, setThemeName] = useLocalStorage<ThemeKey>('theme', 'light');

  const theme = themes[themeName];

  useEffect(() => {
    setThemeName(colorModePreference);
  }, [setThemeName, colorModePreference]);

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
