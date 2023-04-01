module.exports = {
  root: true,
  extends: [
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['!.*.js', '!.storybook'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:prettier/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint', 'react-hooks'],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        // Disabled because Typescript takes care of that already.
        '@typescript-eslint/no-unused-vars': 'warn',
        'import/no-unresolved': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'no-void': 'off',
        'no-warning-comments': 'warn',
        'react/jsx-key': [
          'warn',
          {
            checkFragmentShorthand: true,
          },
        ],
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/no-use-before-define': [
          'error',
          { functions: false },
        ],
      },
      overrides: [
        {
          files: [
            'src/components/**/logic.ts',
            'src/components/**/styles.ts',
            'src/components/**/styles.tsx',
            'src/containers/**/logic.ts',
            'src/containers/**/styles.ts',
            'src/graphql/variables/**/*.ts',
          ],
          rules: {
            'import/prefer-default-export': 'off',
          },
        },
        {
          files: [
            'src/components/**/logic.ts',
            'src/containers/**/connect.ts',
            'src/containers/**/logic.ts',
            'src/graphql/hooks/**/*.ts',
            'src/model/**/*.ts',
          ],
          rules: {
            '@typescript-eslint/explicit-module-boundary-types': 'off',
          },
        },
      ],
    },
    {
      files: ['.storybook/*.js'],
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        ecmaFeatures: { jsx: true },
      },
    },
  ],
  rules: {
    'arrow-body-style': 'warn',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'prettier/prettier': 'warn',
  },
};
