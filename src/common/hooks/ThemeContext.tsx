import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {
  ThemeProvider as StyledThemeProvider,
  ThemeContext,
} from 'styled-components';
import themes, { Theme } from '$/styles/themes';

const ThemeUpdateContext = createContext<Dispatch<
  SetStateAction<Theme>
> | null>(null);

// look for local storage or preference
const initialState = themes.light;

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(initialState);
  return (
    <StyledThemeProvider theme={theme}>
      <ThemeUpdateContext.Provider value={setTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </StyledThemeProvider>
  );
};

const useTheme = () => {
  const theme = useContext(ThemeContext);
  const setTheme = useContext(ThemeUpdateContext);

  const toggleTheme = () => {
    if (setTheme) {
      setTheme((prev) => (prev.name === 'light' ? themes.dark : themes.light));
    }
  };

  return { theme, toggleTheme };
};

export { ThemeProvider, useTheme };
