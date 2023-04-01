import { css } from 'styled-components';

const getKeysOf = <T extends Record<string, unknown>>(object: T): string[] =>
  Object.keys(object) as [];

export const sizes = {
  mobile: 480,
  tabletPortrait: 767,
  tabletLandscape: 960,
  laptop: 1200,
  desktop: 1441,
};

const minWidthQuery = (width: number) => `@media (min-width: ${width}px)`;

export type Breakpoint = keyof typeof sizes;

export const from = getKeysOf(sizes).reduce(
  (acc, key): { [index: string]: string } => ({
    ...acc,
    [key]: minWidthQuery(sizes[key as Breakpoint]),
  }),
  {} as {
    [index: string]: string;
  },
);

export const showFromMixin = (breakpoint?: Breakpoint) =>
  breakpoint
    ? css`
        display: none;
        ${from[breakpoint]} {
          display: flex;
        }
      `
    : null;
