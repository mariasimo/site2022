import light from './light';
import dark from './dark';
import { css } from 'styled-components';

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

const parseThemeCssVariables = (theme: Theme) =>
  Object.entries(theme.colors).map(
    ([name, value]) => `--theme-${name}: ${value}`,
  );

const lightColorsVariables = css`
  ${parseThemeCssVariables(themes.light).join(';')}
`;
const darkColorsVariables = css`
  ${parseThemeCssVariables(themes.dark).join(';')}
`;

export const Theming = css`
  :root {
    --theme-font-display: 'Neue Haas Grotesk Display Pro';
    --theme-font-text: 'Neue Haas Grotesk Text Pro';
    ${lightColorsVariables};
  }

  html.dark {
    ${darkColorsVariables};
  }
`;

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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const colors = themesKey[colorMode].colors;

  Object.entries(colors).forEach(([label, value]) => {
    const cssVarName = '--theme-' + label;
    root.style.setProperty(cssVarName, value);
  });

  root.style.setProperty('--initial-color-mode', colorMode);
}

const boundFn = String(setColorsByTheme).replace(
  "'🌈'",
  JSON.stringify(themes),
);

export const loadTheme = `(${boundFn})()`;
