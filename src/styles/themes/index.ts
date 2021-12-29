import light from './light';
import dark from './dark';

const untypedThemes = {
  light,
  dark,
};

export type Theme = typeof light;
export type ThemeKey = keyof typeof untypedThemes;
export type Color = keyof Theme['colors'];

const themes: { [k in ThemeKey]: Theme } = untypedThemes;

export default themes;

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  // noinspection JSUnusedGlobalSymbols
  export interface DefaultTheme extends Theme {}
  /* eslint-enable @typescript-eslint/no-empty-interface */
}

// LoadTheme function
// This function is injected at head scripts (at document)
// Is used to check theme user preferences and load proper css variables
// Before actually loading the site
// Via https://www.joshwcomeau.com/react/dark-mode/#our-first-hurdle

const boundFn = String(setColorsByTheme).replace(
  "'🌈'",
  JSON.stringify(themes),
);

export const loadTheme = `(${boundFn})()`;

function setColorsByTheme() {
  const themesKey = '🌈' as unknown as { [name: string]: Theme };

  function getInitialColorMode(): ThemeKey {
    const persistedColorPreference = window.localStorage.getItem('theme');
    const hasPersistedPreference = typeof persistedColorPreference === 'string';

    if (hasPersistedPreference) {
      return persistedColorPreference as ThemeKey;
    }
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';
    if (hasMediaQueryPreference) {
      return mql.matches ? 'dark' : 'light';
    }
    return 'light';
  }
  const colorMode: ThemeKey = getInitialColorMode();
  const root = document.documentElement;
  const colors = themesKey[colorMode].colors;

  Object.entries(colors).forEach(([label, value]) => {
    const cssVarName = '--theme-' + label;
    root.style.setProperty(cssVarName, value);
  });

  root.style.setProperty('--initial-color-mode', colorMode);
}
