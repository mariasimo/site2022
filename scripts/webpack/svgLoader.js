module.exports = function svgLoader(config) {
  config.module.rules.push({
    test: /\.svg$/i,
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
