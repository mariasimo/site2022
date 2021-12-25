const keysOf = <T extends Record<string, unknown>>(object: T): string[] =>
  Object.keys(object) as [];

export const sizes: { [index: string]: number } = {
  mobile: 480,
  tablet: 767,
  laptop: 1200,
};

const minWidthQuery = (width: number) => `@media (min-width: ${width}px)`;

export const from = keysOf(sizes).reduce(
  (
    acc: {
      [index: string]: string;
    },
    key: keyof typeof sizes,
  ): { [index: string]: string } => ({
    ...acc,
    [key]: minWidthQuery(sizes[key]),
  }),
  {},
);
