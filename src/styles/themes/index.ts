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
      return JSON.parse(persistedColorPreference) as ThemeKey;
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
  const colors = themesKey[colorMode]?.colors;

  root.style.setProperty('--initial-color-mode', colorMode);

  if (typeof colors !== 'undefined') {
    Object.entries(colors).forEach(([label, value]) => {
      const cssVarName = '--theme-' + label;
      root.style.setProperty(cssVarName, value);
    });
  }
}

/**
 * If the user has JS disabled, the injected script will never fire!
 * This means that they won't have any colors set, everything will be default
 * black and white.
 * We can solve for this by injecting a `<style>` tag into the head of the
 * document, which sets default values for all of our colors.
 * Only light mode will be available for users with JS disabled.
 * Adapted From https://github.com/joshwcomeau/dark-mode-minimal/blob/master/gatsby-ssr.js
 */

export const fallbackStyles = () => {
  const cssVariableString = Object.entries(themes.light.colors).reduce(
    (acc, [name, value]) => `${acc}\n--theme-${name}: ${value};`,
    '',
  );

  const wrappedInSelector = `html { ${cssVariableString} }`;

  return wrappedInSelector;
};
