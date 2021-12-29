import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import type { ThemeKey } from '$/styles/themes';
import themes from '$/styles/themes';

const ThemeUpdateContext = createContext<{
  themeName: ThemeKey;
  setTheme: (value: 'light' | 'dark') => void;
}>({ themeName: 'light', setTheme: () => null });

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, rawSetThemeName] = useState<ThemeKey>('light');

  useEffect(() => {
    const initialThemeValue = getInitialValue();
    rawSetThemeName(initialThemeValue);

    setThemeSetVars(initialThemeValue);
  }, []);

  const setTheme = (theme: ThemeKey) => {
    rawSetThemeName(theme);
    localStorage.setItem('theme', theme);
    setThemeSetVars(theme);
  };

  return (
    <ThemeUpdateContext.Provider value={{ themeName, setTheme }}>
      {children}
    </ThemeUpdateContext.Provider>
  );
};

const useTheme = () => {
  const { themeName, setTheme } = useContext(ThemeUpdateContext);

  const toggleTheme = () => {
    if (setTheme) {
      const newValue: ThemeKey = themeName === 'light' ? 'dark' : 'light';
      setTheme(newValue);
    }
  };

  return { themeName, toggleTheme };
};

export { ThemeProvider, useTheme };

function setThemeSetVars(theme: ThemeKey) {
  const root = window.document.documentElement;

  const themeColors = themes[theme].colors;

  Object.entries(themeColors).forEach(([label, value]) => {
    const cssVarName = '--theme-' + label;
    root.style.setProperty(cssVarName, value);
  });
}

function getInitialValue() {
  const root = window.document.documentElement;
  const initialThemeValue = root.style.getPropertyValue(
    '--initial-color-mode',
  ) as ThemeKey;

  return initialThemeValue;
}
