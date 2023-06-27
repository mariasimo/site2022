---
title: 'ESLint Guide, part 1: how to use ESLint with confidence'
metaTitle: 'ESLint Guide, part 1: how to use ESLint with confidence'
metaDescription: 'The most popular linter in the Javascript ecosystem is being updated with flat config, a new, simpler, and more powerful configuration API. In this article, we review the legacy system to get the most out of migrating to flat config.'
socialImage: '/images/eslint-guide-04-2023/og-1-en.png'
published: '26/06/2023'
status: 'draft'
language: 'en'
tags:
  - 'Guide'
  - 'Tools'
  - 'DX'
  - 'Linter'
  - 'Code standards'
  - 'NPM dependency'
---

_ESLint_ is a tool that complements anyone who develops in the Javascript ecosystem. But do we really know it? We thoroughly review the current _ESLint_ configuration system before migrating to _flat config_, its new system.

---

## Motivations and plan for this guide

The goal of this series of articles is to explain **how to share our ESLint configuration as an external dependency** to automate the [Z1 Digital Studio](https://z1.digital/) front-end team's code standards.

When starting to investigate how to do this, I discovered that _ESLint_ is in the process of releasing a new configuration system called _flat config_. This system is already functional, has support in CLI, and official documentation available from version 8.23.0. It replaces **eslintrc** (from now on the _legacy_ or traditional system), which will lose support from version 9. In [this link](https://github.com/eslint/eslint/issues/13481) you can read about the implementation process.

_Flat config_ proposes drastic changes in the way we configure _ESLint_ in projects. Therefore, it is worth making a small digression to learn about the new configuration before jumping into creating our external dependency. This way we can lead its adoption and avoid refactoring when the change is effective.

This article assumes that you have used _ESLint_ before, although you may not have gone into detail about how it works or all that it can offer.

The plan for this series of articles is as follows:

**‍Part 1. Mastering _ESLint_**. First, we will learn everything we need to know about the legacy system to get the most out of the migration process. So, we can use _ESLint_ with confidence and control.

**Part 2. Migrating to flat config**. We discover the essential changes proposed by flat config and migrate our case study to the new system.

**Part 3. Creating an _ESLint_ shareable config**. We go deeper into shareable configs and the _ESLint_ dependency ecosystem. We incorporate other static analysis tools. We start configuring our repository as an NPM dependency.

**Part 4. Improving the experience with additional tools**. We add version and dependency management. We create a README to document and facilitate the use of our dependency. We explore creating a CLI to complement it.

## What is ESLint and why is it important?

_ESLint_ is a static code analysis tool. Unlike dynamic analysis tools, such as testing, which needs to execute the code to give us a result, _ESLint_ is capable of analyzing our code without executing it. This way, it helps us to maintain and improve the quality of the code we write as we write it.

> _ESLint_ automates our opinions based on rules, and warns us when one of these rules is breached.

It is the most popular tool in its category, which includes others like _Prettier_, _StyleLint_, _CommitLint_... or the type checker of _Typescript_. We configure these tools at the beginning of the project, and they continuously assist us during its development. Ideally, we should run them at different stages of the process (in the IDE, when committing, in our continuous integration pipeline...), to ensure that we meet the quality standards we have established.

And how does _ESLint_ help us create and maintain quality standards? First of all, **it doesn't make decisions for us**, but rather leaves it in our hands, in the hands of the team, to agree on what will define code quality. It automates our opinions based on rules and warns us when one of these rules is broken.

All this is expressed in one or more configuration files, where we declare the rules that will apply to the project. We will usually also rely on an _ESLint_ extension for our IDE to get immediate feedback. Without this extension, we would only have the _ESLint_ CLI to rely on for code review.

The value we get from _ESLint_ depends largely on the effort we invest in understanding it. A lot of the time it is adopted by inertia, blindly transferring the same setting from one project to another, with no control over what those rules say about our project design.

Even in the worst cases, _ESLint_ can become an enemy that shouts at us, and we don't understand why: "if my code works, what is _ESLint_ complaining about now?". Then it behaves like an overload of configurations that we don't know how to handle, and that will make us hate the blend of red and yellow wavy lines that roam freely through the project files.

But when we use it the right way, _ESLint_ is a superpower. It helps us maintain consistency throughout the codebase during the entire life of the app, improving its design and maintainability.

> If we find ourselves repeatedly correcting or commenting on a recurring error with the team, there is probably an _ESLint_ rule we can add to automate the solution. The best conventions are the ones that are automated.

Writing software is a team activity. As a team, we agree on good practices and conventions that allow us to work together and move forward quickly and safely. But any rule, no matter how good it is, is useless if the team is not able to apply it consistently.

This is where _ESLint_ shines, because it allows you to **align the team around these conventions, which are documented in the configuration file, and at the same time frees them from having to remember them** and apply them every time.

These conventions can include syntax and naming preferences, style conventions, prevention of logical or syntax errors, detection of obsolete code usage, use or avoidance of certain patterns, among others.

Whether we find ourselves repeatedly correcting or commenting on a recurring error with the team, there is probably an _ESLint_ rule we can add to automate the solution. The best conventions are the ones that are automated.

## Anatomy of ESLint Configuration

Before starting with the case study, we review the main properties of the _ESLint_ configuration object:

### The rules

[The _ESLint_ rules](https://eslint.org/docs/latest/use/configure/rules) are designed to be completely independent of each other, activated and deactivated individually. _ESLint_ is a tool with which to automatically impose our views on the code, so there is no rule that we cannot deactivate. Everything is subject to opinion and will depend on our needs. Rules accept three possible severity levels: "error", "warn" and "off", and can accept an array to configure some options more precisely. Many of them have autofix capability, to automatically correct the error.

### Overrides

The `overrides` property is very important in the legacy system, and will also play a prominent role in the **flat config**. It is an array that accepts objects in which we define specific configurations for subsets of files. To define each subset, we use the `files` and `excludeFiles` properties. These properties take globs expressions as a value **relative to the directory** where the configuration file is located.

```js
module.exports = {
  rules: {
    // General rules
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      excludeFiles: '*.test.ts',
      rules: {
        // Rules for Typescript files
      },
    },
    {
      files: ['**/*stories.*'],
      rules: {
        // Rules for Storybook files
      },
    },
  ],
};
```

Overrides is an alternative and more understandable functionality compared to the cascading design, very characteristic of _ESLint_, which we will delve into in part 2 of this series.

### Extends key vs plugins key

There is something that is quite strange in _ESLint_, and that has caused me confusion more than once, because we have dependencies called `eslint-plugin-foo` and others called `eslint-config-foo`. And because in some occasions it is indicated that we have to use them with `extends`, and others with `plugins`.

As we have said, _ESLint_ is a modular and configurable system. We can install additional rules to configure our perfect use case. These rules come packaged in NPM dependencies with the name `eslint-plugin-[my-plugin]`. To use them, we install them and pass the name to the plugin array: `plugins: ["my-plugin"]` (it is not necessary to use the prefix `eslint-plugin-`).

But this does not automatically activate our rules. When we pass the value to the `plugins` array, we are simply making them available to the system for use. Then we can activate the ones we want in the `rules` property:

```js
// .eslintrc.js

module.exports = {
  plugins: ['my-plugin'],
  rules: {
    // Rules need to be prefixed with the name of the plugin
    'my-plugin/some-available-rule': 'error',
  },
};
```

This is where _shareable configs_ (hereafter _configs_) come into play. To save us the tedious work of having to activate rules one by one, there are other NPM dependencies with the name `eslint-config-[my-config]` that directly activate a set of predefined rules when included in the `extends` array: `extends: ["my-config"]` (it is not necessary to use the prefix `eslint-config-`).

_Configs_ can use one or several _plugins_ underneath, can be extended from other _configs_ and add for us, in addition to rules, any other configuration necessary for their proper functioning.

```js
module.exports = {
  // the plugin is enabled under the hood and some recommended rules are applied
  extends: ['my-config/recommended'],
};
```

Finally, it is common for plugins that are shared as dependencies to also bring a set of _configs_ with them that the authors have considered useful and that we can use in extends. For example, `eslint-plugin-react` includes as configs `recommended`, `typescript`, `jsx-runtime`, etc.

This can be confusing, as both the plugin itself and a set of configs are exported in the same plugin dependency. But it is highly convenient because it allows us to both extend from a predefined configuration and apply individual rules.

To use an imported config from a plugin, we follow the syntax: `plugin:[name-plugin]/[name-config]`.

```js
module.exports = {
  extends: ['plugin:my-plugin/recommended', 'plugin:my-plugin/strict'],
  plugin: ['my-plugin'],
  rules: {
    'my-plugin/some-additional-rule': 'error',
  },
};
```

In summary:

- **Configs** can contain anything that can be added to an _ESLint_ configuration file, they come packaged as `eslint-config-<my-config>`, and are passed to the `extends` property. They are the way we can share and reuse "ready-to-consume" configurations and save us the work of creating them ourselves.

- **Plugins** add new rules to the system. They come packaged as `eslint-plugin-<my-plugin>` and are passed to the `plugins` property, so that rules can be activated individually in `rules`. They can also export configs to activate pre-defined sets of those rules.

### Other root keys

In addition to `rules`, `overrides`, `extends` and `plugins`, the _ESLint_ settings includes other properties, such as `env`, `settings`, `parser`, `parserOptions`, etc., which are essential to the functionality of _ESLint_. For example, defining the behavior of plugins, making _ESLint_ able to interpret different syntaxes, recognizing environment variables, etc. We will see the most common ones below, in our practical case. We can pay attention to their configuration, because in the **flat config** (part 2) they will be transformed and reorganized.

## A case study

Let's turn to action! In this section, we are going to incrementally create a real, although simplified for example purposes, _ESLint_ configuration that we use for production projects with the following stack:

- React
- Typescript
- Storybook
- Testing

One of the hallmarks of _ESLint_, responsible for much of its success, is its extensibility. The _ESLint_ ecosystem is made up of a wide variety of plugins and configurations available as NPM packages that we can import to establish our use case.

Sometimes the number of dependencies that we have to install to configure a project[^1] can be overwhelming. But the reward is that we can install exactly what we need:

### ESLint recommendations

`eslint:recommended` contains a series of rules that the _ESLint_ team, after analyzing many projects, considers useful in most cases. So the first thing we do is include these rules in our configuration. In the traditional system, they are included within _ESLint_, so nothing needs to be installed.

```js
//.eslintrc.js

module.exports = {
  extends: ['eslint:recommended'],
};
```

### Prettier

_Prettier_ is a formatter, _ESLint_ is a linter. Formatters are faster and less "intelligent" than linters, because they do not evaluate the code logic. They are responsible for rewriting it following purely visual formatting rules (tabs, spaces, dots and commas, line lengths...). While linters understand the logic and syntax, and give us indications according to each of the activated rules.

When we use _Prettier_ and _ESLint_ together, since Eslint contains formatting rules, we need to install something like `eslint-config-prettier`, to deactivate those rules and indicate to _ESLint_ that _Prettier_ will be in charge of formatting.

The `eslint-plugin-prettier` and related plugins are not recommended in the vast majority of cases. They make _Prettier_ behave like a linter rule, which is much slower. There is no need to do this when we have _Prettier_ configured as a stand-alone tool.

**When using _Prettier_ and _ESLint_ in the same project, it is important that we allow each tool to perform the task it does best.**.

```js
//.eslintrc.js

module.exports = {
  extends: [
    'eslint:recommended',
    // prettier should be listed last to resolve any possible conflicts in its favor
    'prettier',
  ],
};
```

### React

We will install a couple of plugins to include React-related rules and to make _ESLint_ able to understand `jsx`, which is not a native syntax in JavaScript: `eslint-plugin-react` and `eslint-plugin-react-hooks`. The latter is separate because there was a time when hooks were not part of React.

Plugins need to know the React version, because their performance may depend on it, so we use `settings` to tell _ESLint_ to look in the `package.json`.

We use the recommended settings in `extends`. In addition, we add to `extends` `plugin:react/jsx-runtime`, another configuration that helps us disable the rules that require us to import React at the beginning of each file, which is not necessary from React 17.

All the configurations we have extended include parsing options so that _ESLint_ can interpret `jsx`. Even so, we add it explicitly to the file for greater clarity.

```js
//.eslintrc.js

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  settings: {
    react: {
      reactVersion: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    // Here we can manually activate rules for our React files
  },
};
```

### Typescript

For _ESLint_ to be able to understand _Typescript_ files, we need to install `@typescript-eslint`, which contains a parser and a bunch of recommended rules for working with _Typescript_. In this case, we need to use `overrides` and create a block where we pass globs to capture files with extensions `.ts` and `.tsx`.

We will extend the recommended configuration, `plugin:@typescript-eslint/recommended`, but also a second configuration, `plugin:@typescript-eslint/recommended-requiring-type-checking`, which make _ESLint_ much more powerful by [using type information to detect errors](https://typescript-eslint.io/linting/typed-linting). To make it work, we have to provide _ESLint_ with type information. We do this with `project: true`, which tells _ESLint_ to look for the nearest `tsconfig.json`.

We're also going to extend `plugin:@typescript-eslint/eslint-recommended`. What it does is disable `eslint:recommended` rules that are already controlled by _Typescript_, to avoid duplication.

```js
// .eslintrc.js

module.exports = {
  // The rules we defined earlier goes here
  // ...
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: true,
      },
      plugins: ['typescript-eslint'],
      rules: {
        // Here we can manually activate rules for our React files
      },
    },
  ],
};
```

### Storybook

We install the official _Storybook_ plugin for _ESLint_, which contains best practice rules for handling stories and the configuration directory .storybook : `eslint-plugin-storybook`. By default, the rules of this plugin only apply to files matching the patterns: `*.stories.*` (recommended) or `*.story.*`. So it is **very important that the names of our story files follow this convention**, or the plugin will not take effect.

In _ESLint_, files that start with a dot are not analyzed by default. So we also need to add the `.storybook` directory to the list of files we want to analyze. We use a negation pattern in `ignorePatterns` so that _ESLint_ is able to find this directory:

```js
//.eslintrc.js

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:storybook/recommended',
    'prettier',
  ],
  ignorePatterns: [
    '!.storybook'
  ]
  // The rest of root keys goes here
  overrides: [
    // Typescript files overrides goes here
  ],
};
```

### Accesibilidad

We use `eslint-plugin-jsx-a11y` to help us detect potential accessibility errors in our React components. We simply extend the recommended configuration.

```js
//.eslintrc.js

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:storybook/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  ignorePatterns: [
    '!.storybook'
  ]
  // The rest of root keys goes here
  overrides: [
    // Typescript files overrides goes here
  ],
};
```

### Imports

With `eslint-plugin-import` we can prevent a number of errors related to module import and export. We will need to install `eslint-import-resolver-typescript` to have Typescript support.

We activate some specific rules for this plugin:

- At a stylistic level, `import/sort` will sort and group imports at the beginning of our files automatically (it is a rule with autofix), making it much easier to understand the imports and avoid maintaining them manually.

- We activate `import/no-extraneous-dependencies` to throw an error if we import dependencies that are not defined in package.json.

- We enable `import/no-default-export` because we prefer to use _named exports_. In some cases, such as in stories, we need to allow _default exports_, so we will enable a block in _overrides_ to handle this type of exception.

```js
// .eslintrc.js

module.exports = {
  extends: [
    //...
    'plugin:import/recommended',
    'prettier',
  ],
  plugins: [
    //...,
    'import',
  ],
  settings: {
    // We need this so that ESLint can resolve our imports
    'import/resolver': {
      node: true,
      typescript: true,
    },
  },
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '$/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        groups: [
          ['builtin', 'external'],
          ['internal'],
          ['parent', 'sibling', 'index'],
          'unknown',
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-default-export': 'error',
    'import/no-extraneous-dependencies': 'error',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        //...
        'plugin:import/typescript',
      ],
    },
    {
      files: [
        // Stories files
        '*stories.*',
        // Next pages files
        'src/pages/**/*.tsx',
        // Typescript declaration file
        'additional.d.ts',
        // Graphql Codegen generated file
        '**/instrospection.ts',
      ],
      rules: {
        'import/no-anonymous-default-export': 'off',
        'import/no-default-export': 'off',
      },
    },
  ],
};
```

### Testing

For our _ESLint_ configuration to be able to interpret our testing files, we also need to make some additions, which will depend on the tools we are using.

- **Jest**. To use Jest we need to activate the global variable `jest` in `env`, so that _ESLint_ can recognize it. We also need to allow our `mocks` to contain default exports.

```js
// .eslintrc.js

module.exports = {
  // General rules and properties...
  overrides: [
    // Remaining blocks
    {
      files: ['**/__tests__/**', '**/__mocks__/**'],
      env: {
        jest: true,
      },
    },
    {
      files: [
        // Remaining paths...
        '**/__mocks__/**',
      ],
      rules: {
        'import/no-anonymous-default-export': 'off',
        'import/no-default-export': 'off',
      },
    },
  ],
};
```

- **React Testing Library**. We install two plugins: `eslint-plugin-testing-library` and `eslint-plugin-jest-dom`. We use them only for our testing files:

```js
// .eslintrc.js

module.exports = {
  // General rules and properties...
  overrides: [
    // Remaining blocks
    {
      files: ['**/__tests__/**', '**/__mocks__/**'],
      extends: ['plugin:testing-library/react', 'plugin:jest-dom/recommended'],
      env: {
        jest: true,
      },
      rules: {
        'testing-library/no-render-in-setup': 'error',
        'testing-library/no-wait-for-empty-callback': 'error',
        'testing-library/prefer-explicit-assert': 'error',
        'testing-library/prefer-presence-queries': 'error',
        'testing-library/prefer-screen-queries': 'error',
        'testing-library/prefer-wait-for': 'error',
      },
    },
  ],
};
```

- **Cypress**. We will install another plugin that will only analyze the files in the `/cypress` folder. In the `parserOptions` of the _Typescript_ block we will modify project to include the _Cypress_ type settings:

```js
// .eslintrc.js

module.exports = {
  // General rules and properties...
  overrides: [
    // Remaining blocks
    {
      files: ['*.ts', '*.tsx'],
      //...
      parserOptions: {
        project: ['./tsconfig.json', './cypress/tsconfig.json'],
      },
    },
    {
      files: ['**/cypress/**'],
      extends: ['plugin:cypress/recommended'],
      env: {
        'cypress/globals': true,
      },
    },
  ],
};
```

![Gif of Office's character Michael Scott doing a ta-da! gesture](/images/eslint-guide-04-2023/ta-freaking-da.gif?width=content)

Et voila 🎉! Here we have our final configuration file, integrating all the parts we mentioned and adding some details, such as the activation of a handful of individual rules.

```js
//.eslintrc.js
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:storybook/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  plugins: ['react', 'react-hooks', 'storybook', 'import', 'jsx-a11y'],
  env: {
    node: true,
    browser: true,
  },
  settings: {
    ecmaVersion: 'latest',
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: true,
      typescript: true,
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: [
    '!*.js',
    '!.storybook',
    '.*.js',
    '*.json',
    'scripts',
    'src/graphql/generated/*',
  ],
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-warning-comments': 'warn',
    'object-shorthand': 'error',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['acc', 'next'],
      },
    ],
    'react/prop-types': 'off',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link', 'NextLink', 'RouterLink'],
        aspects: ['invalidHref'],
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '$/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        groups: [
          ['builtin', 'external'],
          ['internal'],
          ['parent', 'sibling', 'index'],
          'unknown',
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-default-export': 'error',
    'import/no-extraneous-dependencies': 'error',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/typescript',
      ],
      plugins: ['@typescript-eslint/eslint-plugin'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json', './cypress/tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/no-use-before-define': [
          'error',
          { functions: false },
        ],
        '@typescript-eslint/no-floating-promises': [
          'error',
          { ignoreVoid: true },
        ],
      },
    },
    {
      files: [
        '*stories.*',
        'src/pages/**/*.tsx',
        'additional.d.ts',
        '**/__mocks__/**',
        'cypress.config.ts',
      ],
      rules: {
        'import/no-anonymous-default-export': 'off',
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['**/__tests__/**', '**/__mocks__/**'],
      env: {
        jest: true,
      },
      extends: ['plugin:testing-library/react', 'plugin:jest-dom/recommended'],
      rules: {
        'testing-library/no-render-in-setup': 'error',
        'testing-library/no-wait-for-empty-callback': 'error',
        'testing-library/prefer-explicit-assert': 'error',
        'testing-library/prefer-presence-queries': 'error',
        'testing-library/prefer-screen-queries': 'error',
        'testing-library/prefer-wait-for': 'error',
      },
    },
    {
      files: ['**/cypress/**'],
      plugins: ['cypress'],
      extends: ['plugin:cypress/recommended'],
      env: {
        'cypress/globals': true,
      },
    },
  ],
};
```

## Tips for configuring the IDE and scripts

Now that we have the configuration for the project ready, we can attend to other aspects that help us with the _ESLint_ user experience.

First, we can configure _Visual Studio Code_ in the context of our project, so that all team members work in an environment with the same behavior. In the project root, we create a `.vscode` directory with two files:

One called `extensions.json`, in which we can include the extensions we recommend installing, _ESLint_ and _Prettier_ (assuming we are using both tools, as is often the case). These extensions integrate the capabilities of these tools into our IDE, to inform us of errors and warnings, and facilitate their resolution.

```json
//.vscode/extensions.json
{
  "recommendations": ["esbenp.prettier-vscode", "dbaeumer.vscode-eslint"]
}
```

![Screencapture of VSCode with a pop-up window which recommends to install ESLint extension](/images/eslint-guide-04-2023/vscode-recommended.png 'Visual Studio Code will show a pop-up window when opening the project with the recommended extensions')

- Another one called `settings.json`, where we can configure some functionalities that improve our development experience. When saving, _ESLint_ will correct all possible errors and _Prettier_ will format our code.

```json
//.vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,

  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

Finally, we need to configure a couple of _ESLint_ scripts in our `package.json`, in order to integrate it into the different phases of the development process: when committing, in the CI pipeline, etc.

```json
{
  "scripts": {
    "lint": "eslint . --max-warnings 0 --report-unused-disable-directives --ignore-path .gitignore",
    "lint-fix": "pnpm lint -- --fix"
  }
}
```

These are some useful options that we can pass to the command:

- `--max-warnings 0`. In _ESLint_, a rule activated with a warn severity level, will give a warning but will still allow our code to compile. This may cause the team to internalize that it is possible and okay to ignore _ESLint_ warnings. Since we don't want that, we don't allow warnings.
- `--report-unused-disable-directives`. Sometimes, we have cases where we are forced to deactivate a rule for a specific file or line with a comment like `/*_ eslint-disable _/*`. This option notifies us of obsolete _ESLint_ deactivation comments due to refactors, etc.
- `--ignore-path .gitignore` allows us to indicate to _ESLint_ which files we are not interested in analyzing, for example `node_modules`.

**Following steps 👋**

In part 2 of this guide, we will see how to migrate our configuration to the new _ESLint_ system, the **flat config**.

[^1]: In addition to the mentioned plugins and configurations, other ones that could be interesting to review and include in this type of application are the Next.js plugin, the SonarLint plugin for writing clean code, and `eslint-plugin-filenames` to help establish file and directory naming conventions.

## References

- [Flat config announcement, part 1](https://eslint.org/blog/2022/08/new-config-system-part-1/)
- [Flat config announcement, part 2](https://eslint.org/blog/2022/08/new-config-system-part-2/)
- [Flat config implementation roadmap](https://github.com/eslint/eslint/issues/13481)
- [ESLint Docs: Using a configuration from a plugin](https://eslint.org/docs/latest/use/configure/configuration-files#using-a-configuration-from-a-plugin)
- [ESLint Docs: Ways to extend](https://eslint.org/docs/latest/extend/ways-to-extend)
- [Different between extends and plugins](https://prateeksurana.me/blog/difference-between-eslint-extends-and-plugins/)
- ["Prettier vs. Linters" - Prettier docs](https://prettier.io/docs/en/comparison.html)
- ["Stop using _ESLint_ for formatting" - Joshua K. Goldberg at React Miami 2023](https://www.youtube.com/live/mPPZ-NUnR-4?feature=share&t=26572)
- [Using tabs in Prettier for accessibility](https://github.com/prettier/prettier/issues/7475)
- [No-floating-promises vs no-void](https://mikebifulco.com/posts/eslint-no-floating-promises)
