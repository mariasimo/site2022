const { readdirSync } = require('fs');

const readSubDirs = (dir) => readdirSync(dir).filter((it) => !it.includes('.'));

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [0, 'always', 200],
    'scope-case': [0],
    'header-max-length': [0, 'always', 110],
    'scope-enum': [
      2,
      'always',
      [
        'ci',
        'deps',
        'deps-dev',
        'lint',
        'package',
        'content',
        ...readSubDirs('src'),
        ...readSubDirs('src/common'),
        ...readSubDirs('src/common/components'),
        ...readSubDirs('src/home'),
        ...readSubDirs('src/note'),
        ...readSubDirs('src/lib'),
        // Add any directories you'd like to be scoped
      ],
    ],
  },
};
