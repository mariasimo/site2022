module.exports = {
  '*.{js,ts,tsx}': ["eslint --ignore-pattern '!*' --fix --max-warnings=0"],
  '*.{html,md,json,yml}': ['prettier --write'],
  '*.svg': ['prettier --write --parser html'],
};
