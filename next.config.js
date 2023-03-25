const svgLoader = require('./scripts/webpack/svgLoader.js');

module.exports = {
  webpack(config) {
    svgLoader(config, '/_next');
    return config;
  },
  eslint: {
    // We don't lint during the build because GitHub actions performs its own lint step
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
};
