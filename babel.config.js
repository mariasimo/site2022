const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'styled-components',
      {
        displayName: isDev,
        fileName: isDev,
        meaninglessFileNames: ['index', 'styles'],
        minify: !isDev,
        pure: true,
        ssr: true,
      },
    ],
  ],
};
