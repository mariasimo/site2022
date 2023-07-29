---
title: 'Guía de EsLint, parte 2: migrar a Flat Config'
metaTitle: 'Guía de EsLint, parte 2: migrar a Flat Config'
metaDescription: 'El linter más popular en el ecosistema de JavaScript se actualiza con "flat config", una nueva API de configuración más simple y poderosa'
socialImage: '/images/eslint-guide-04-2023/og.png'
publishedAt: '19/04/2023'
status: 'draft'
language: 'es'
tags:
  - 'Tools'
  - 'DX'
  - 'Linter'
  - 'Code standards'
  - 'NPM dependency'
---

El linter más popular del ecosistema de Javascript se renueva con una nueva API de configuración más simple y potente. Aprende antes que nadie a adoptarla para tus proyectos.

---

## Introducción

El objetivo inicial para esta serie de artículos era contar **cómo disponibilizar nuestra configuración de EsLint como una dependencia externa** para que todo el equipo de [Z1 Digital Studio](https://z1.digital/) pueda importarla directamente en sus proyectos. Esto nos va a permitir dar un paso más en la automatización de nuestros estándares de código.

Sin embargo, al empezar a investigar, descubrí que EsLint está en el proceso de lanzar un nuevo sistema de configuración llamado **flat config** (que traduciría en algo así como "configuración plana"). Este sistema ya es funcional, tiene soporte en la CLI y documentación oficial disponible desde la versión 8.23.0. El nuevo sistema viene a sustituir al tradicional, que perderá soporte con la versión 9.

En el [roadmap disponible en Github](https://github.com/eslint/eslint/issues/13481), vemos que el equipo de EsLint está a punto de abordar una tercera fase de desarrollo encargada de asegurar el buen funcionamiento de los plugins más populares. Después de eso, se iniciará una fase de disponibilización general y, finalmente, una fase de retirada de soporte para **eslintrc**.

_Flat config_ presenta cambios drásticos en la manera en la que configuramos EsLint en los proyectos. Así que merece la pena hacer una pequeña disgresión para aprender sobre la nueva configuración antes de lanzarnos a crear nuestra dependencia externa. Así podemos liderar su adopción y evitamos refactorizar la dependencia cuando **eslintrc** pierda soporte.

El esquema para esta serie de artículos, por tanto, es el siguiente:

**Parte 1. Flat config: cómo migrar al nuevo sistema de EsLint**

- Qué es EsLint, y porqué es importante
- Introducción al nuevo sistema de EsLint, flat config
- Actualización de nuestra configuración actual a flat config

**Parte 2. Creando una shareable config de EsLint**

- Qué es una shareable config
- El problema de las peer dependencies
- Cómo compartir configuraciones de ESLint como dependencia externa
  - Organización del código
- Cómo proporcionar flexibilidad al equipo para configurar esta dependencia de acuerdo a las necesidades del proyecto a través de la opción de múltiples exports
- Incorporación de otros linters, como Prettier y Stylelint, Commitlint.

**Parte 3. Mejorar la experiencia con herramientas adicionales**

- Creación de un archivo README para documentar nuestro trabajo y facilitar su uso
- Añadimos utilidades para asegurar la mantenibilidad de nuestra dependencia
- Creación de una CLI para instalar nuestra dependencia con configuraciones.

## EsLint en 2023. ¡Hola, Flat Config!

A mediados del pasado año, el equipo de ESLint publicó [una serie de artículos](https://eslint.org/blog/2022/08/new-config-system-part-1/) con los que anunciaba la llegada de la **flat config**.

EsLint ha ido creciendo de manera orgánica durante su ciclo de vida — est. 2013, y algunas de las decisiones tomadas han aumentado su complejidad de manera innecesaria. Hasta tal punto que había partes del código que nadie sabía como funcionaban, o que era imposible implementar nuevas features con facilidad.

> "(...) the team was collectively becoming afraid of touching anything to do with the config system. No one really understood all of the different permutations around calculating the final config for any given file. **We had fallen into the trap that many software projects do: we kept adding new features without taking a a step back to look at the problem** (and solution) holistically. This had led to an almost unmaintainable part of our codebase."

Seguro que es una sensación familiar para muchos. Esto da cuenta de que de que cualquier proyecto, por popular que sea, sufre cuando no se detiene a pensar en su diseño a alto nivel.

Finalmente fue necesario tomar perspectiva y re-pensar _EsLint_ desde el momento actual. El nuevo sistema se empieza a concebir en 2019. Cuatro años más tarde está en la fase final de su implementación, lo cual ofrece una idea de la magnitud de la iniciativa.

### Eslintrc vs Flat config

Vamos a hacer una comparativa entre el sistema todavía vigente, **Eslintrc**, y el nuevo sistema, **Flat config**, que nos permitirá revisar los principales problemas actuales frente a las soluciones que se proponen:

#### Un único archivo de configuración: eslint.config.js

Empecemos por algo evidente. Para poner _EsLint_ a funcionar tenemos que crear un archivo de configuración en nuestro proyecto.

**Eslintrc** permite muchos formatos y extensiones para el archivo de configuración: `.eslintrc`, `.eslintrc.js`, `.eslintrc.json`, `.eslintrc.yaml`.

Para una persona que empieza con _EsLint_ puede ser confuso entender que todos los formatos permitidos son equivalentes, y que usar uno u otro es una cuestión de preferencia.

**Flat config** permite una única forma de declarar el archivo de configuración: `eslint.config.js`. Lo que no sólo simplifica la API si no que viene a resolver importantes problemas que existían en cuanto a la resolución de dependencias, como veremos adelante.

-> IGUAL METO AQUI UNA REFERENCIA RÁPIDA A LA RESOLUCÓN DE DEPENDENCIAS Y LUEGO EXPLICO EN LA PARTE DOS

#### Adiós a la configuración en cascada

Una de las características del diseño de **Eslintrc** es su configuración en cascada: es posible tener múltiples archivos de configuración mediante los que sobreescribir una configuración más general por otra más específica para un directorio concreto.

Por ejemplo, podemos tener un `.eslintrc` en la raíz del proyecto y otro en nuestra carpeta de tests _e2e_, con reglas específicas para esos archivos.

A alto nivel: lo que hace _EsLint_ a la hora de analizar un archivo en particular es partir de la ubicación este archivo e ir recolectando las diferentes configuraciones que encuentra desde ese punto hasta la raíz del proyecto. Una vez encontradas, las mezcla, otorgando precedencia en caso de conflicto a las configuraciónes más cercanas a la ubicación del archivo. Finalmente, usa la combinación resultante para revisar el archivo.

Para más información sobre el comportamiento de la cascada, puedes revisar [la documentación oficial](https://eslint.org/docs/latest/use/configure/configuration-files#cascading-and-hierarchy).

La configuración de cascada tiene algunos problemas:

- **Ofrece poca visibilidad**. Genera confusión porque se puede olvidar, o directamente desconocer, que existen diferentes archivos de configuración en el proyecto interfiriendo entre sí. Otras veces, simplemente es difícil que las diferentes configuraciones trabajen juntas como es debido. Para solucionar esto, se añadió propiedad `root` al objeto de configuración. Si pasamos `root: true` al cualquiera de los archivos de configuración, EsLint se detendrá y dejará de buscar en los directorios superiores.
- **No es muy eficiente**. Cada vez que queremos analizar un archivo, EsLint tiene que recorrer la estructura de ficheros desde el punto actual para poder realizar la operación.

- **Aumenta la complejidad de la API**. Posteriormente a la configuración en cascada, se añadieron nuevas propiedades al objeto de configuración, como `overrides`, que cumplen con un objetivo similar, especificar reglas para un conjunto de archivos. Tener varias estrategias para solucionar el mismo problema resulta confuso y aumenta la complejidad de tanto de la interfaz como de la implementación.

![EsLint solo usará la configuración de /cypress para los archivos de este directorio, porque hemos añadido `root: true` en la línea 2](/images/eslint-guide-04-2023/cascade-file-tree.png 'EsLint solo usará la configuración de /cypress para los archivos de este directorio, porque hemos añadido `root: true` en la línea 2')

También en este caso la **flat config** opta por la simplificación. Con dos cambios principales:

- **Una única localización**. En lugar de permitir multiples archivos de configuración, sólo tendremos un único archivo con toda la configuración necesaria, que podemos colocar donde queramos. _EsLint_ lo buscará desde nuestro directorio actual hacia la raíz del proyecto hasta dar con él, momento en el que parará porque ya no necesita buscar posibles archivos de configuración adicionales.

- **Un sustituto más ergonómico de la cascada**. Con una único archivo de configuración, la cascada dejar de ser posible tal y como estaba implementada. Flat config va a usar la misma mécanica de `overrides` para hacer posible la misma funcionalidad. La propiedad `overrides` es un array que acepta una serie de objetos que nos sirven para definir reglas específicas para determinados conjuntos de archivos que especificamos con las propiedades `files` y `excludeFiles`. Estas propiedades toman como valor expresiones globs **relativas al directorio** donde se localiza el archivo de configuración.

  De manera similar a `overrides`, todo el archivo **flat config** es un un array donde definimos conjuntos de reglas para subconjuntos de archivos.

  La ventaja de esto es que la visibilidad es muy superior, al estar todas las configuraciones contenidas en un único archivo. En caso de conflicto, la precedencia es para las reglas definidas con posterioridad, lo cual es fácil de entender.

![La estructura de la Flat config es un array donde definimos reglas especificas para distintos conjuntos de archivos](/images/eslint-guide-04-2023/glob-pattern-system.png 'La estructura de la Flat config es un array donde definimos reglas especificas para distintos conjuntos de archivos')

-> ESTOS SON LOS CAMBIOS EVIDENTES O FUNDAMENTALES. OTROS SE PUEDEN CONSULTAR EN EL ARTICULO Y LA DOC. OTROS LOS IREMOS VIENDO AL MIGRAR LA CONFIGURACIÓN

## Profundizando en la configuración de EsLint

¡Pasemos a la acción! Este artículo asume que has usado EsLint con anterioridad, aunque quizás no hayas entrado en el detalle de cómo funciona o todo lo que puede ofrecer. En esta sección, vamos a partir de una configuración de EsLint real, aunque simplificada para fines de ejemplo, que usamos para proyectos en producción con el siguiente _stack_:

- React
- Typescript
- Storybook
- Testing

Si estás acostumbrado a lidiar con configuraciones de EsLint, puede que quieras saltarte esta sección, y pasar directamente a la migración a **flat config**, aunque esta revisión puede ser de utilidad para entender todos los detalles de la siguiente parte.

Si nunca has usado EsLint antes, aún serás capaz de seguir el hilo porque todo está explicado en detalle, puede ser recomendable que empieces por algo más básico.

Vamos a ir poco a poco desglosando todas las piezas que hay aquí:

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
    react: {
      version: 'detect',
    },
    ecmaVersion: 'latest',
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
    '.*.js',
    '*.json',
    '!*.js',
    '!.storybook',
    'src/graphql/generated/*',
  ],
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
      files: ['.storybook/*.js'],
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2022,
        ecmaFeatures: { jsx: true },
      },
    },
    {
      files: ['**/__tests__/**', '**/__mocks__/**'],
      env: {
        jest: true,
      },
      extends: ['plugin:testing-library/react', 'plugin:jest-dom/recommended'],
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

### Las reglas

Las [reglas de EsLint](https://eslint.org/docs/latest/use/configure/rules) (`rules`) están pensadas para ser completamente independientes las unas de las otras, y activarse y desactivarse de forma individual. EsLint es una herramienta con la que imponer automáticamente nuestras opiniones sobre el código, así que no hay regla que no podamos desactivar. Todo dependerá de nuestras necesidades. Las reglas adminten tres posibles grados de severidad: "error", "warn" y "off". Ocasionalmente, pueden aceptar un array para configurar algunas opciones de forma más granular.

### Root keys

Además de las reglas, los extends y los plugins, la configuración de EsLint incluye otras propiedades, como `env`, `settings`, `parser`, `parserOptions`, etc., además del ya mencionado `overrides`, que son esenciales para la funcionalidad de EsLint, para definir el comportamiento de plugins, hacer que EsLint sea capaz de interpretar diferentes sintaxis, entornos, etc. Nuestro archivo de `.eslintrc` incluye algunas de ellas. Podemos fijarnos en su configuración, porque en la **flat config** se van a transformar y reorganizar.

### Extends key vs plugins key

Hay una cosa que me parece muy confusa de EsLint, y es porque tenemos dependencias llamas `eslint-plugin-foo` y otras llamadas `eslint-config-foo`, y porque en unas ocasiones se indica que tenemos que usarlas con `extends`, y otras con `plugins`. Vamos a a intentar aclararlo.

Como hemos dicho, EsLint es un sistema modular y configurable. Podemos instalar reglas adicionales para configurar nuestro caso de uso perfecto. Estas reglas vienen empaquetadas en dependencias NPM con el nombre de `eslint-plugin-<my-plugin>`. Para usarlas, las instalamos y pasamos el nombre al array de plugins: `plugins: ["my-plugin"]`.

Pero esto no va a hacer que nuestras reglas estén activas automáticamente. Cuando pasamos el plugin al array de `plugins` simplemente las estamos haciendo disponibles al sistema para su uso. Entonces podemos activar las que queramos en la propiedad `rules`:

```js
// .eslintrc.js

module.exports = {
  // notice my-plugin does not need to be preceded by "eslint-plugin"
  plugins: ['my-plugin'],
  rules: {
    'my-plugin/some-available-rule': 'error',
  },
};
```

Aquí es donde entran en juego las `shareable configs`. Para ahorrarnos el trabajo tedioso de tener que activar reglas una a una, existen otras dependencias de NPM con el nombre de `eslint-config-<my-config>`. En este caso, si pasamos el nombre de la dependencia a `extends`, esta se encarga por nosotros de habilitar el plugin y activar directamente un conjunto de reglas pre-definidas. Ésta es una manera en la que EsLint nos permite compartir y reusar nuestras configuraciones entre proyectos. Las config suelen usar uno o varios plugins por debajo, pueden extenderse de otras configuraciones y configurar por nosotros, además de reglas, otras root keys que sean necesarias para su buen funcionamiento. En resumen, es una manera de cargar en nuestro proyecto una configuración completa, _lista para consumir_, y ahorrarnos el trabajo de hacerlo nosotros.

```js
module.exports = {
  // the plugin is enabled under the hood and some recommended rules are applied
  extends: ['my-config/recommended'],
};
```

Como siempre en EsLint se sigue una regla de precedencia: si extendemos diferentes configuraciones, en caso de conflicto entre reglas, aplica la última especificada.

```js
module.exports = {
  // both configs activate the same rule with different degress of severity
  extends: ['my-config/recommended', 'other-config/recommended'],
};
```

Lo que puede acabar resultando confuso, es que lo habitual es que los plugins como dependencias traigan también consigo un set de configs que los autores han considerado de utilidad y podemos usar en `extends`. Por ejemplo, `eslint-plugin-react` incluir como configs `recommended`, `typescript`, `jsx-runtime`, etc. De tal manera que los plugins como dependencias nos permiten extender de una configuración pre-definida, pero también aplicar reglas individuales:

```js
module.exports = {
  // syntax change in this case, we need to use the prefix "plugin:"
  extends: ['plugin:my-plugin/recommended', 'plugin:my-plugin/strict'],
  plugin: ['my-plugin'],
  rules: {
    'my-plugin/some-additional-rule': 'error',
  },
};
```

En resumen:

- Las configs pueden contener todo lo que se pueda añadir a un archivo de configuración de _EsLint_, vienen paquetizadas como `eslint-config-<my-config>` y se pasan a la propiedad extends.
- Los plugins añaden nuevas reglas al sistema y además pueden exportar configs para activar conjuntos de esas reglas por defecto. Vienen paquetizados como `eslint-plugin-<my-plugin>` y se pasan a la propiedad `plugins` para poder activar reglas de forma individual en `rules`. Si además el plugin contiene `configs`, se pasan a `extends` con el formato "plugin:nombre-plugin/nombre-config", ej: `plugin:react/recommended`.

### Plugins (dependencias)

Una de las principales características (y motivos de éxito) de _EsLint_ es que es un sistema modular. En ocasiones puede abrumar la cantidad de dependencias que tenemos que instalar[^1]. Como contrapartida, la ventaja es que podemos instalar únicamente lo que necesitamos cada vez en función del proyecto.

Estas son las dependencias incluidas en el proyecto:

- **Recomendaciones de EsLint**: `eslint:recommended` (línea 5) contiene una serie de reglas que el equipo de EsLint, después de analizar muchísimos proyectos, considera de utilidad en la mayoría de casos. En el sistema tradicional, están incluidas dentro de EsLint. Así que lo primero que hacemos es incluir estas reglas.

- **Prettier**: `eslint-config-prettier` (línea 6). Prettier es un formateador, EsLint es un linter. Los formateadores son más rápidos y menos "inteligentes" que los linters, porque no entran a valorar la lógica del código. Se encargan reescribir nuestro código siguiendo reglas de formateo puramente visual del código (tabs, espacios, puntos y comas, largos de línea...), mientras que los linters, como hemos mencionado antes, entienden la lógica y la sintáxis del código y nos dan indicaciones al respecto de acuerdo a cada una de las reglas activadas. **Cuando usamos Prettier y EsLint juntos, es importante que respetemos dejemos que cada herramienta realice la tarea que mejor sabe hacer**. EsLint contiene reglas de estilo, por eso necesitamos instalar algo como `eslint-config-prettier`, para desactivar esas reglas e indicar a EsLint que Prettier va a ser el encargado de formatear el código. `eslint-plugin-prettier` no está recomendando en la gran mayoría de casos porque hace que Prettier se comporte como una regla del linter, lo que es mucho más lento. No hay necesidad de hacerlo así porque tenemos configurado Prettier como herramienta independiente. Más información:

  - "Prettier vs. Linters" - [Prettier docs](https://prettier.io/docs/en/comparison.html)
  - "Stop using EsLint for formatting" - [Joshua K. Goldberg at React Miami 2023](https://www.youtube.com/live/mPPZ-NUnR-4?feature=share&t=26572)

- **React**: Vamos a instalar un par de plugins para incluir las reglas relacionadas con React, y además hacer que EsLint sea capaz de entender `jsx`, que no es una sintáxis nativa en Javascript: `eslint-plugin-react` y `eslint-plugin-react-hooks`. Éste último se debe instalar de manera separada porque hubo un tiempo en que los hooks no eran parte de React. Usamos las configuraciones recomendadas en `extends` y además activamos los plugins para definir algunas reglas.

  También añadimos a `extends` `plugin:react/jsx-runtime` para desactivar las reglas que requieren que importemos `React` al inicio de cada archivo, porque no es necesario a partir de React 17.

  Aunque todas las configuraciones que hemos extendido, incluyen la opción para que EsLint sea capaz de parsear `jsx`, lo añadimos de forma explícita al archivo en `parserOptions` para mayor claridad.

  Los plugins necesitan conocer la version de React, porque de ello puede depender el funcionamiento del plugin, así que indicamos a eslint que mire en el `package.json`.

```js
//.eslintrc.js

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  plugins: ['react', 'react-hooks'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      reactVersion: 'detect',
    },
  },
};
```

- **Typescript**: Para que EsLint sea capaz de entender nuestros archivos de Typescript (porque obviamente no son nativos de Javascript), necesitamos instalar `@typescript-eslint`, que contiene un parser y un montón de reglas recomendadas para trabajar con Typescript. En este caso, necesitamos hacer uso de `overrides` y crear un bloque donde pasamos globs para las extensiones de Typescript.

  Vamos a extender un segundo grupo de reglas, `plugin:@typescript-eslint/recommended-requiring-type-checking`, que hacen que EsLint sea capaz de [usar la información de tipos para detectar errores](https://typescript-eslint.io/linting/typed-linting). Para que funcione, tenemos que facilitar a EsLint la información de tipos. Lo hacemos con `project: true`, que indica a EsLint que busque el `tsconfig.json` más cercano.

  También vamos a extender `plugin:@typescript-eslint/eslint-recommended`. Lo que hace es desactivar las reglas de `eslint:recommended` que ya están controladas por Typescript, para evitar duplicidades.

```js
// .eslintrc.js

module.exports = {
  // Aqui van las propiedades que definimos con anterioridad
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
    },
  ],
};
```

- **Storybook**: Instalamos el plugin oficial de Storybook para EsLint, que contiene reglas con las mejores prácticas para el tratamiento de las historias y del directorio de configuración `.storybook`: `eslint-plugin-storybook`. Por defecto, las reglas de este plugin solo aplican a los archivos que hagan match con los globs: `*.stories.*` (recomendado) o `*.story.*`. Así que es **muy importante que los nombres de los archivos de nuestras historias sigan esta convención**, de otra manera, el plugin es inútil.

  También necesitamos añadir a la lista de archivos que queremos analizar, el directorio `.storybook`. Por defecto, los archivos que empiezan por punto no se analizan. Usamos un patrón con negación en `ignorePatterns` para que EsLint sea capaz de encontrar este directorio:

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
  plugins: ['react', 'react-hooks', 'storybook'],
  ignorePatterns: [
    '!.storybook'
  ]
  // rest of root keys settings...
  overrides: [
    // typescript files overrides...
  ],
};
```

- **Accesibilidad**: Usamos `eslint-plugin-jsx-a11y` para que nos ayude a detectar potenciales errores de accessibilidad en nuestros componentes de React. Simplemente extendemos las configuración recomendada.

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
  plugins: ['react', 'react-hooks', 'storybook', 'jsx-a11y'],
  ignorePatterns: [
    '!.storybook'
  ]
  // rest of root keys settings...
  overrides: [
    // typescript files overrides...
  ],
};
```

- **Imports**: Vamos a instalar otro plugin, `eslint-plugin-import`, para prevenir una serie de errores relaciones con la importación y exportación de módulos. Necesitaremos instalar `eslint-import-resolver-typescript` para tener soporte de Typescript.

Activamos algunas reglas específicas para este plugin:

- A nivel estilístico, `import/sort` nos va a servir para ordernar y dividir en grupos los imports al principio de nuestros archivos de manera automática, con lo cual va a ser mucho más facil entender las importaciones y evitar mantenerlas manualmente.
- Usamos `import/no-extraneous-dependencies` para lanzar un error si importamos dependencias que no estén definidas en nuestro package.json
- Usamos `import/no-default-export` porque preferimos los named exports. En algunos casos, como en las historias necesitamos permitirlos, así que vamos a habilitar un bloque para ello en la lista de `overrides`.

```js
// .eslintrc.js

module.exports = {
  extends: [
    //...
    'plugin:import/recommended',
  ],
  plugins: [
    //...,
    'import',
  ],
  settings: {
    // necesitamos este settings para que EsLint sea capaz de resolver nuestros imports
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
        '*stories.*',
        'src/storybook/**/*.*',
        'src/pages/**/*.tsx',
        'additional.d.ts',
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

- **Testing**: Para que nuestra configuración de EsLint sea capaz de interpretar los archivos de testing, también necesitamos hacer algunas adiciones, que dependerán de las herramientas que estemos usando.

  **Jest**. En `overrides` activamos la variable de entorno de Jest para que Eslint no nos la marque como indefinida. También necesitamos permitir que nuestros `mocks` contengan `default exports`.

```js
// .eslintrc.js

module.exports = {
  // propiedades y reglas generales
  overrides: [
    // resto de bloques
    {
      files: ['**/__tests__/**', '**/__mocks__/**'],
      env: {
        jest: true,
      },
    },
    {
      files: [
        // resto de paths
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

**React Testing Library**. En este caso, tenemos la opción de instalar y configurar dos plugins: `eslint-plugin-testing-library` y `eslint-plugin-jest-dom`. Los usamos solo para nuestros archivos de testing:

```js
// .eslintrc.js

module.exports = {
  // propiedades y reglas generales
  overrides: [
    // resto de bloques
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

**Cypress**. Para Cypress instalaremos otro plugin que solo analizará los archivos de la carpeta `/cypress`:

```js
// .eslintrc.js

module.exports = {
  // propiedades y reglas generales
  overrides: [
    // resto de bloques
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

## Migrar a Flat config

Ahora siiiii

Este artículo asume cierto conocimiento de eslint
este artículo asume que tenemos una configuración de eslint ya funcionando, si no es así...

- Plugins que usamos y porqué los usamos
- Construcción incremental de la flat config
- Diferencia entre plugins y config: qué hay dentro de estos paquetes??

Linter: "is a tool that runs a set of checks on your source code" -> looks at the logic of your code
check -> rule -> may report on code it doesn't like -> may autofix
the rules are standalone, independent. it does not know about each other
además las reglas pueden configurarse con diferentes grados de severidad: error, warn o off.
"logical-assignment-operators": "error" -> friend = friend || "me" -> friend ||= "me"

```bash
pnpm install eslint --save-dev
pnpm init @eslint/config -> esto hace cosas por ti?

npx eslint .
```

## Tips para configurar el IDE y los scripts

Activa flat config
Scripts
Para Docu de la dependencia (???)

```json
{
  "scripts": {
    "lint": "eslint . --max-warnings 0 --report-unsued-disabled-directives",
    "lint-fix": "pnpm lint -- --fix"
  }
}
```

- report-unsued-disabled-directives: nos advierte de comentarios que hemos puesto para deshabilitar una regla, pero que ya no son necesarios
- max-warnings: un warning va a dar un aviso pero no va a hacer que falle el build, si permitimos warnings estamos dejando que la gente ignore eslint y no queremos eso

## Siguientes pasos

En la parte 2.
Reescritura de EsLint

SI NO HAY BACKLINKS DEBERÍA HABER UN SEGUIR LEYENDO??

- report-unsued-disabled-directives: nos advierte de comentarios que hemos puesto para deshabilitar una regla, pero que ya no son necesarios
- max-warnings: un warning va a dar un aviso pero no va a hacer que falle el build, si permitimos warnings estamos dejando que la gente ignore eslint y no queremos eso

[^1]: Sonar Lint, nextjs y eslint-plugin-filenames tb son opciones interesantes.

## References

Traer lo necesario de obsidian

- [Sheriff Flat config]()
- [Joshua K. Golberg - Linters template]()
- [Eslint + Typescript - Joshua K. Golberg, React Miami 2023]()
- [Usar tabs en prettier por accesibilidad](https://github.com/prettier/prettier/issues/7475)
- Copiar estructura de airbnb y shreiff par aorganizar los archivos
- Codesplitting para evitar que se cargen todas las dependencias o algo así???
- [No-floating-promises vs no-void](https://mikebifulco.com/posts/eslint-no-floating-promises)

Más info sobre la diferencia entre plugins y configs:

- [EsLint Docs: Using a configuration from a plugin](https://eslint.org/docs/latest/use/configure/configuration-files#using-a-configuration-from-a-plugin)
- [EsLint Docs: Ways to extend](https://eslint.org/docs/latest/extend/ways-to-extend)
- [Different between extends and plugins](https://prateeksurana.me/blog/difference-between-eslint-extends-and-plugins/)

## Backlinks

- [Guía para crear una dependencia de EsLint con Flat Config (Parte 2)](./guide-eslint-dependency-part-2-npm-dependency)
