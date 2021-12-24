module.exports = function svgLoader(config) {
  config.module.rules.push({
    test: /\.svg$/,
    loader: '@svgr/webpack',
    options: {
      svgoConfig: {
        plugins: [
          {
            name: 'removeViewBox',
            active: true,
          },
          {
            name: 'removeViewBox',
            active: false,
          },
        ],
      },
    },
  });
  return config;
};
