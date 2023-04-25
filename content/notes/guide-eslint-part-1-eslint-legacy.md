---
title: 'Guía de EsLint, parte 1: cómo usar EsLint con confianza'
metaTitle: 'Guía de EsLint, parte 1: cómo usar EsLint con confianza'
metaDescription: 'El linter más popular del ecosistema de Javascript se renueva con flat config, una nueva API de configuración más simple y potente. En este artículo, revisamos el sistema legacy para sacar el mayor partido de la migración a flat config'
socialImage: '/images/eslint-flat-config-19-04-2023/og.png'
published: '19/04/2023'
status: 'draft'
language: 'es'
tags:
  - 'Tools'
  - 'DX'
  - 'Linter'
  - 'Code standards'
  - 'NPM dependency'
---

_ESLint_ es una herramienta con la que convive cualquier persona que desarrolla en el ecosistema de Javascript. Pero, ¿realmente la conocemos? Revisamos a fondo el sistema legacy de configuración _ESLint_ antes de migrar a _flat config_, su nuevo sistema.

---

## Motivaciones y plan para esta guía

El último objetivo de esta serie de artículos es explicar **cómo compartir nuestra configuración de EsLint como una dependencia externa** para automatizar los estándares de código del equipo de front de [Z1 Digital Studio](https://z1.digital/).

Al empezar a investigar para hacer esto, descubrí que _ESLint_ está en el proceso de lanzar un nuevo sistema de configuración llamado **_flat config_** (que traduciría en algo así como "configuración plana"). Este sistema ya es funcional, tiene soporte en la CLI y documentación oficial disponible desde la versión 8.23.0., y viene a sustituir a **eslintrc**, el sistema legacy, que perderá soporte a partir de la versión 9.

El [roadmap para la implementación del nuevo sistema](https://github.com/eslint/eslint/issues/13481) se encuentra en el inicio de una tercera fase, encargada de asegurar el buen funcionamiento de los plugins más populares del ecosistema. Después de eso, se iniciará una fase de disponibilización general y, finalmente, una fase de retirada de soporte para el sistema legacy.

**_Flat config_** propone cambios drásticos en la manera en la que configuramos _ESLint_ en los proyectos. Así que merece la pena hacer una pequeña disgresión para aprender sobre la nueva configuración antes de lanzarnos a crear nuestra dependencia externa. Así podemos liderar su adopción y evitamos refactorizar cuando el cambio sea efectivo.

El plan para esta serie de artículos, por tanto, es el siguiente:

**Parte 1. Dominando EsLint**. Primero aprenderemos todo lo necesario del sistema legacy para sacar el mayor partido del proceso de migración. Así podemos usar EsLint con confianza y control.

**Parte 2. Migrando a flat config**. Descubrimos los cambios esenciales que propone la flat config, y migramos nuestro caso práctico al nuevo sistema.

**Parte 3. Creando una shareable config de EsLint**. Profundizamos en las _shareable configs_ y el ecosistema de dependencias de EsLint. Incorporamos otras herramientas de análisis estático. Empezamos a configurar nuestro repositorio como dependencia NPM.

**Parte 4. Mejorando la experiencia con herramientas adicionales**. Añadimos gestión de versiones y de dependencias. Creamos un READMe para documentar nuestro trabajo. Exploramos la creación de una CLI para complementar nuestra dependencia.

## Qué es EsLint y porqué es importante

_ESLint_ es una herramienta de análisis estático de código. Frente a las herramientas de análisis dinámico, como el testing, que necesita ejecutar el código para darnos un resultado, es capaz de analizar nuestro código sin ejecutarlo. De forma que nos ayuda a mantener y mejorar la calidad del código que escribimos al tiempo que lo escribimos.

> EsLint es una herramienta que nos ayuda a mantener y mejorar la calidad del código que escribimos al tiempo que lo escribimos

Es la herramienta más popular en su categoría, que incluye otras como _Prettier_, _StyleLint_, _CommitLint_... o incluso el _type checker_ de _Typescript_. Vamos a configurar estas herramientas en el inicio del proyecto y nos van a asistir de manera continuada durante su desarrollo. Lo ideal es ejecutarlas en diferentes fase del proceso — en nuestro IDE, al hacer commit, en nuestro pipeline de integración continua, para asegurarnos de que cumplimos con los estándares de calidad que hemos establecido.

¿Cómo nos ayuda EsLint a crear y mantener esos estándares de calidad? Lo primero es que no toma decisiones por nosotros, sino que deja de nuestra mano, de la mano del equipo, convenir en qué va a definir la calidad del código. Es un sistema extensible, que automatiza nuestras opiniones en base a reglas, y que nos va a advertir cuando una de estas reglas se incumpla. El ecosistema de EsLint está formado por una gran variedad de plugins y configuraciones disponibles como paquetes NPM que podemos importar para ajustar su configuración a nuestro caso de uso.

> Es un sistema extensible, que automatiza nuestras opiniones en base a reglas, y que nos va a advertir cuando una de estas reglas se incumpla.

Todo esto se expresa en uno o más archivos de configuración, donde declaramos las reglas que van a aplicar a nuestro proyecto. Normalmente también nos vamos a apoyar en una extensión de EsLint para nuestro IDE, para obtener un feedback inmediato. Sin esta extensión, tendríamos que confiar únicamente en la CLI de EsLint para la revisión del código.

El valor que obtenemos de EsLint depende en gran medida del esfuerzo que invertimos en entenderlo. Muchas veces se adopta por inercia, trasladando de manera ciega las mismas configuraciones de un proyecto a otro, sin control sobre qué dicen esas reglas sobre el diseño de nuestro proyecto.

En los peores casos, EsLint se puede convertir en un enemigo que nos grita y no entendemos porqué: "si mi código funciona, ¿de qué se queja _ESLint_ ahora?". Entonces se comporta como una sobrecarga de configuraciones que no sabemos cómo manejar y que nos hará odiar la amalgama de líneas onduladas rojas y amarillas que campa a sus anchas por los archivos del proyecto.

> Si, una y otra vez, nos encontramos corrigiendo o comentando un error recurrente con el equipo, es probable que exista una regla de EsLint que podemos añadir al proyecto para automatizar la solución. Las mejores convenciones son las que se automatizan.

Pero cuando lo usamos de la manera correcta, _ESLint_ es un super poder. Nos ayuda a mantener una consistencia a lo largo de la base de código y durante toda la vida del proyecto, mejorando su diseño y mantenibilidad.

Escribir software es una actividad de equipo. Como equipo, acordamos buenas prácticas y convenciones que nos permitan trabajar juntos y avanzar con paso rápido y seguro. Pero cualquier norma, por buena que sea, no sirve de nada si el equipo no es capaz de aplicarla de manera constante. Aquí es donde _EsLint_ brilla, porque permite alinear a todo el equipo en torno a estas convenciones, que quedan documentadas en el archivo de configuración, y al mismo tiempo les libera de tener que recodarlas y aplicarlas cada vez.

Estas convenciones pueden incluir preferencias de sintaxis y nombrado, convenciones de estilo, prevención de errores lógicos o de sintaxis, detección de usos obsoletos de código, uso o evitación de ciertos patrones, entre otros. Que pueden ser generales o relativas a ciertas tecnologías, y que pueden aplicarse a todo el conjunto del código o solo a determinados ficheros o extensiones.

## Anatomía de la configuración de EsLint

Revisamos las principales propiedades del objeto de configuración de EsLint:

### Las reglas

Las [reglas de EsLint](https://eslint.org/docs/latest/use/configure/rules) (`rules`) están pensadas para ser completamente independientes las unas de las otras, y activarse y desactivarse de forma individual. EsLint es una herramienta con la que imponer automáticamente nuestras visiones sobre el código, así que no hay regla que no podamos desactivar. Todo está sujeto a opinión, y dependerá de nuestras necesidades. Las reglas adminten tres posibles grados de severidad: "error", "warn" y "off". Ocasionalmente, pueden aceptar un array para configurar algunas opciones de forma más precisa.

### Overrides

La propiedad `overrides` es muy importante en el sistema legacy, y también va a tener un papel destacado en la **flat config**. Se trata es un array que acepta una lista de objetos que nos sirven para definir configuraciones que queremos aplicar de manera específica a subconjuntos de archivos. Para especificar los archivos afectados, usamos las propiedades `files` y `excludeFiles`. Estas propiedades toman como valor expresiones globs **relativas al directorio** donde se localiza el archivo de configuración.

```js
module.exports = {
  rules: {
    // Reglas generales
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      excludeFiles: '*.test.ts',
      rules: {
        // Reglas para archivos de Typescript
      },
    },
    {
      files: ['**/*stories.*'],
      rules: {
        // Reglas para archivos de Storybook
      },
    },
  ],
};
```

Overrides es una funcionalidad alternativa al diseño en cascada, muy característico de _ESLint_, en el que profundizaremos en la parte 2 de esta serie.

### Extends key vs plugins key

Hay algo que resulta bastante confuso en _ESLint_, y es porque tenemos dependencias llamas `eslint-plugin-foo` y otras llamadas `eslint-config-foo`. Y porque en unas ocasiones se indica que tenemos que usarlas con `extends`, y otras con `plugins`. Vamos a a intentar aclararlo.

Como hemos dicho, EsLint es un sistema modular y configurable. Podemos instalar reglas adicionales para configurar nuestro caso de uso perfecto. Estas reglas vienen empaquetadas en dependencias NPM con el nombre de `eslint-plugin-<my-plugin>`. Para usarlas, las instalamos y pasamos el nombre al array de plugins: `plugins: ["my-plugin"]` (no es necesario usar el prefijo `eslint-plugin-`).

Pero esto no va a hacer que nuestras reglas estén activas automáticamente. Cuando pasamos el valor al array de `plugins`, simplemente las estamos haciendo disponibles al sistema para su uso. Entonces podemos activar las que queramos en la propiedad `rules`:

```js
// .eslintrc.js

module.exports = {
  plugins: ['my-plugin'],
  rules: {
    'my-plugin/some-available-rule': 'error',
  },
};
```

Aquí es donde entran en juego las _shareable configs_ (en adelante, _configs_). Para ahorrarnos el trabajo tedioso de tener que activar reglas una a una, existen otras dependencias de NPM con el nombre de `eslint-config-<my-config>`. Si pasamos el nombre de la configuración a `extends`, ésta se encarga por nosotros de habilitar el _plugin_ y activar directamente un conjunto de reglas pre-definidas.

Las _configs_ pueden usar uno o varios _plugins_ por debajo, pueden extenderse de otras _configs_ y añadir por nosotros, además de reglas, otras _root keys_ necesarias para su buen funcionamiento.

```js
module.exports = {
  // the plugin is enabled under the hood and some recommended rules are applied
  extends: ['my-config/recommended'],
};
```

Es habitual que los plugins que se comparten como dependencias traigan también consigo un set de _configs_ que los autores han considerado de utilidad y que podemos usar en `extends`. Por ejemplo, `eslint-plugin-react` incluye como configs `recommended`, `typescript`, `jsx-runtime`, etc. De tal manera que los plugins como dependencias nos permiten extender de una configuración pre-definida, pero también aplicar reglas individuales:

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

- Las **_configs_** pueden contener todo lo que se pueda añadir a un archivo de configuración de _ESLint_, vienen paquetizadas como `eslint-config-<my-config>` y se pasan a la propiedad `extends`. Son la manera en la podemos compartir y reusar configuraciones "listas para consumir", y ahorrarnos el trabajo de crearlas nosotros.

- Los **_plugins_** añaden nuevas reglas al sistema y además pueden exportar configs para activar ciertos conjuntos de esas reglas. Vienen paquetizados como `eslint-plugin-<my-plugin>` y se pasan a la propiedad `plugins`, para poder activar reglas de forma individual en `rules`. Si además el plugin contiene `configs`, éstas se pasan a `extends` con el formato "plugin:nombre-plugin/nombre-config", ej: `plugin:react/recommended`.

### Otras root keys

Además de `rules`, `overrides`, `extends` y `plugins`, la configuración de EsLint incluye otras propiedades, como `env`, `settings`, `parser`, `parserOptions`, etc., que son esenciales para la funcionalidad de _ESLint_, a la hora de definir el comportamiento de plugins, hacer que _EsLint_ sea capaz de interpretar diferentes sintaxis, reconozca variables de entorno, etc. Veremos las más habituales a continuación, en nuestro caso práctico. Podemos fijarnos en su configuración, porque en la **flat config** (parte 2) se van a transformar y reorganizar.

## Un caso práctico

¡Pasemos a la acción! Este artículo asume que has usado EsLint con anterioridad, aunque quizás no hayas entrado en el detalle de cómo funciona o todo lo que puede ofrecer. En esta sección, vamos a partir de una configuración de EsLint real, aunque simplificada para fines de ejemplo, que usamos para proyectos en producción con el siguiente _stack_:

- React
- Typescript
- Storybook
- Testing

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

### Plugins (dependencias)

Una de las principales características (y motivos de éxito) de _ESLint_ es que es un sistema modular. En ocasiones puede abrumar la cantidad de dependencias que tenemos que instalar[^1]. Como contrapartida, la ventaja es que podemos instalar únicamente lo que necesitamos cada vez en función del proyecto.

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

## Tips para configurar el IDE y los scripts

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
