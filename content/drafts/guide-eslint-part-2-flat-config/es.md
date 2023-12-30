---
title: 'Guía de EsLint, parte 2: migrando a Flat Config'
metaTitle: 'Guía de EsLint, parte 2: migrando a Flat Config'
metaDescription: 'El linter más popular en el ecosistema de JavaScript se actualiza con "flat config", una nueva API de configuración más simple y poderosa'
socialImage: '/images/eslint-guide-04-2023/og.png'
publishedAt: '11/04/2023'
status: 'draft'
language: 'es'
tags:
  - 'Tools'
  - 'DX'
  - 'Linter'
  - 'Code standards'
  - 'NPM dependency'
---

Flat config es la nueva manera de hacer las cosas con ESLint. Aprende como migrar a la nueva versión.
El linter más popular del ecosistema de Javascript se renueva con una nueva API de configuración más simple y potente. Aprende antes que nadie a adoptarla para tus proyectos.

---

## Introducción

El primer artículo de esta serie era una introducción detallada sobre ESLint. Vimos cómo funciona y cuál es el valor que aporta a nuestros proyectos. Revisamos los distintos conceptos que le son propios: reglas, _overrides_, _plugins_, _shareable configs_, plugins, etc.

Este artículo avanza sobre el anterior y asume que ya manejamos esos conceptos. Si necesitas refrescar la memoria, aquí tienes un enlace a la primera parte.

Ahora nos centramos en la _flat config_. _Flat Config_ es el nuevo sistema de configuración de ESLint, y está en funcionamiento desde su version 8.23.0 de ESLint. De momento, convive con el sistema legacy, el que hemos usado siempre, que será deprecado a partir de la versión 9.0.0.

Aunque todavía puede pasar tiempo hasta que eso pase, vamos a adelantarnos al cambio y aprender qué cambios propone la _Flat Config_.

**Nota de la autora**.
La primera parte de esta guía se publicó en abril de 2023, aunque seguramente llevaba escribiendo y aprendiendo sobre ESLint algún tiempo antes. Ya estamos en noviembre de 2023, y siento como si llevara un año (de buenos propósitos en buenos propósitos) gestando esta guía. Aunque no ha sido lo único que he estado gestando este año, claro. En mayo, dijimos [hola](https://twitter.com/mariasimocodes/status/1659184290607910913) a nuestra pequeña Greta. Y todas nuestras prioridades cambiaron para siempre ❤️.

## Contenidos

Esta serie de artículos es una guía en profundidad sobre ESLint, y tiene por objetivo final crear una dependencia externa con la configuración de ESLint que podamos reusar en nuestros proyectos.

[**Parte 1. Dominando _ESLint_**](/guide-eslint-part-1-eslint-legacy). Aprendemos todo lo necesario del sistema legacy para sacar el mayor partido del proceso de migración. Así podemos usar _ESLint_ con confianza y control.

📍**Parte 2. Migrando a flat config**. Descubrimos los cambios esenciales que propone la flat config, y migramos nuestro caso práctico al nuevo sistema.

**Parte 3. Creando una shareable config de _ESLint_**. Profundizamos en las _shareable configs_ y el ecosistema de dependencias de _ESLint_. Incorporamos otras herramientas de análisis estático. Empezamos a configurar nuestro repositorio como dependencia NPM.

**Parte 4. Mejorando la experiencia con herramientas adicionales**. Añadimos gestión de versiones y de dependencias. Creamos un README para documentar y facilitar el uso de nuestra dependencia. Exploramos la creación de una CLI para complementarla.

## EsLint en 2023

ESLint apareció en 2013. Desde entonces ha ido evolucionando de manera orgánica, respondiendo a las distintas necesidades de los usuarios y en un ecosistema, el del desarrollo web con Javascript, en plena ebullición.

Nicholas Zakas, su creador, ha reflexionado sobre el proyecto y sobre como algunas de las decisiones que tomaron han aumentado su complejidad de forma innecesaria y se han convertido en obstáculos para seguir avanzando:

> "(...) the team was collectively becoming afraid of touching anything to do with the config system. No one really understood all of the different permutations around calculating the final config for any given file. **We had fallen into the trap that many software projects do: we kept adding new features without taking a a step back to look at the problem** (and solution) holistically. This had led to an almost unmaintainable part of our codebase."

["ESLint's new config system, Part 1: Background"](https://eslint.org/blog/2022/08/new-config-system-part-1/)

Llegados a este punto, el equipo decidió que lo mejor era repensar ESLint desde el momento actual y rediseñar su API, tratando de eliminar inconsistencias, vestigios y duplicidades.

Esta decisión se toma en 2019. Cuatro años más tarde, la _Flat config_ está en la fase final de su implementación, lo cual ofrece una idea de la magnitud de la iniciativa.

## Entonces, ¿qué trae la flat config?

Revisamos las principales características de la flat config, y que problemas del sistema anterior (al que vamos a referirnos como eslintrc) resuelven.

### Un único archivo de configuración

Para poner _EsLint_ a funcionar tenemos que crear un archivo de configuración en nuestro proyecto. **Eslintrc** reconoce muchos formatos y extensiones para el archivo de configuración: `.eslintrc`, `.eslintrc.js`, `.eslintrc.json`, `.eslintrc.yaml`.

Más allá de las preferencias particulares, esta _feature_ no añade mucho valor. De hecho, para una persona que empieza con _EsLint_ puede ser confuso entender que todos los formatos permitidos son equivalentes, y que usar uno u otro es una cuestión de preferencia.

En la **flat config** solo existe una forma de declarar el archivo de configuración: `eslint.config.js`. Lo que no sólo simplifica la API si no que viene a resolver importantes problemas que existían en cuanto a la resolución de dependencias, como veremos adelante.

-> IGUAL METO AQUI UNA REFERENCIA RÁPIDA A LA RESOLUCÓN DE DEPENDENCIAS Y LUEGO EXPLICO EN LA PARTE DOS

### Adiós a la configuración en cascada

Una de las características del diseño de **eslintrc** es [su configuración en cascada](https://eslint.org/docs/latest/use/configure/configuration-files#cascading-and-hierarchy). Es posible tener múltiples archivos de configuración y sobreescribir una configuración más general por otra más específica para un directorio concreto.

Por ejemplo, podemos tener un `.eslintrc` en la raíz del proyecto y otro en nuestra carpeta de tests _e2e_, con reglas específicas para esos archivos.

Lo que hace _EsLint_ a la hora de analizar un archivo en particular, a alto nivel, es partir de la ubicación este archivo e ir recolectando las diferentes configuraciones que encuentra desde ese punto hasta la raíz del proyecto. Una vez encontradas, las mezcla, otorgando precedencia en caso de conflicto a las configuraciones más cercanas a la ubicación del archivo. Finalmente, usa la combinación resultante para revisar el archivo.

Pero la configuración de cascada tiene algunos problemas:

- **Ofrece poca visibilidad**. Genera confusión porque olvidamos, o directamente desconocemos, que existen diferentes archivos de configuración en el proyecto interfiriendo entre sí. Otras veces, simplemente es difícil que las diferentes configuraciones trabajen juntas como es debido. Para solucionar esto, se añadió propiedad `root` al objeto de configuración. Si pasamos `root: true` al cualquiera de los archivos de configuración, EsLint se detendrá y dejará de buscar en los directorios superiores.

- **No es muy eficiente**. Cada vez que queremos analizar un archivo, EsLint tiene que recorrer la estructura de ficheros desde el punto actual para poder realizar la operación.

- **Aumenta la complejidad de la API**. Posteriormente a la configuración en cascada, se añadieron nuevas propiedades al objeto de configuración, como `overrides`, que cumplen con un objetivo similar, especificar reglas para un conjunto de archivos. Tener varias estrategias para solucionar el mismo problema resulta confuso. Aumenta la complejidad de tanto de la interfaz como de la implementación.

Todo esto acaba por aumentar la carga cognitiva, porque es necesario (al menos, si queremos saber qué estamos haciendo) tener en cuenta todas las diferentes localizaciones y propiedades que afectan la jerarquía. Con el tiempo, se van añadiendo funcionalidades, y distintas personas editan estos archivos de configuración, la entropía vinculada a la configuración de ESLint aumenta hasta hacerse insostenible.

![EsLint solo usará la configuración de /cypress para los archivos de este directorio, porque hemos añadido `root: true` en la línea 2](/images/eslint-guide-04-2023/cascade-file-tree.png 'EsLint solo usará la configuración de /cypress para los archivos de este directorio, porque hemos añadido `root: true` en la línea 2')

La flat config repiensa el diseño en cascada para conservar toda su funcionalidad con una forma mucho más simple de uso.

**Una única localización**. Sólo tendremos un único archivo con toda la configuración necesaria, que podemos colocar donde queramos. _EsLint_ lo buscará desde nuestro directorio actual hacia la raíz del proyecto hasta dar con él, momento en el que parará porque ya no necesita buscar posibles archivos de configuración adicionales.

**Un sustituto más ergonómico de la cascada**. Con una único archivo de configuración, la cascada dejar de ser posible tal y como está implementada. La nueva funcionalidad está inspirada en la propiedad overrides del sistema legacy, que describimos en la [parte 1](/guide-eslint-part-1-eslint-legacy#anatomy-of-eslint-configuration). Todo el archivo **flat config** es un un array donde definimos reglas para subconjuntos de archivos.

La ventaja de esto es que la visibilidad es muy superior, al estar todas las configuraciones contenidas en un único archivo. En caso de conflicto, la precedencia es para las reglas definidas con posterioridad, lo cual es fácil de entender.

![La estructura de la Flat config es un array donde definimos reglas especificas para distintos conjuntos de archivos](/images/eslint-guide-04-2023/glob-pattern-system.png 'La estructura de la Flat config es un array donde definimos reglas especificas para distintos conjuntos de archivos')

### El fix más esperado de la historia de ESLint

Una de las cosas que más "asustan" cuando empezamos a usar ESLint es la cantidad de dependencias que tenemos que instalar cuando empezamos a usarlo.

Esto, hasta cierto punto, es lo esperado: ESLint es un sistema modular, pensado para usarse con plugins. El problema viene cuando quieres instalar una configuración como dependencia (por ejemplo, la popular _eslint-config-airbnb_), y esa configuración te pide que instales adicionalmente un buen número de plugins para poder funcionar. Algo como:

```bash
eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

¿Por qué no puede `eslint-config-airbnb` comportarse como una dependencia normal? ¿Por qué no puede gestionar por sí misma sus dependencias, e instalarlas en _node_modules_ sin nuestra intervención?

Si te preguntas esto, no estás sola. Existe [un issue en el Github de ESLint](https://github.com/eslint/eslint/issues/3458) donde, durante años (lleva abierto desde 2015), la gente ha pedido que esto pudiera cambiarse. Pero el diseño del sistema legacy no lo permitía. Veamos porque:

dependencias adicionales, que no sabes qué son. Idealmente debería ser la propia configuración la que pudiera resolver las dependencias por si misma, como un node module normal, sin pedirnos instalar nada a parte.

Porqué ocurre esto?

- peer dependencies / son para plugins
- problema de diseño

En el sistema tradicional se añadió una nueva clave, `extends`, que permitió importar otras configuraciones para extender la nuestra. Esto fue un paso importante porque hizo posible que las configuraciones de EsLint se pudieran distribuir como paquetes de npm, lo que EsLint llama "shareable configs", y es una forma muy popular en la que usamos hoy EsLint.
El equipo de eslint creo `eslint:recommend` una serie de normas que consideraban necesarias para todos los proyectos y que originalmente venían incluidas por defecto en EsLint. Esto permitió separarlas y usarlas de manera específica.
Pero pronto las shareable configs presentaron un problema de resolución de dependencias. Esto obligaba a los usuarios que creaban shareable configs para compartir públicamente o dentro de sus compañías, a tener que listar todas las peerDependencies de las que dependía la config y que los usuarios las tuvieran que instalar de manera independiente. Tener que instalar 10 plugins además de la config, no es ideal porque hace que tener una configuración instalable pierda un poco el sentido.
Los usuarios de EsLint empezaron a quejarse de esto en una issue enorme que podéis ver aquí, pidiendo que las configs pudieran comportarse como un node module normal y resolver las dependencias por si mismas sin tener que instalar nada aparte.

Además, la fijar la extensión del archivo a .js como única posibilidad, permite que ahora los usuarios de EsLint podamos usar `import` o `require` en el archivo de configuración, resolviendo bastantes de los problemas previos que existían con las shareable configs y la resolución custom de dependencias que EsLint tenía que hacer por diseño.

## Añadir IDE recomendations

#### Más idiomático

Podemos usar js spread
property shorthand

#### Dependencias, importamos

-> ESTOS SON LOS CAMBIOS EVIDENTES O FUNDAMENTALES. OTROS SE PUEDEN CONSULTAR EN EL ARTICULO Y LA DOC. OTROS LOS IREMOS VIENDO AL MIGRAR LA CONFIGURACIÓN

## Un caso práctico

En el articulo anterior, compartimos una configuración para un proyecto con React, Typescript, Storybook y testing. Vamos a migrarla a Flat config. Nos quedaría así:

```js
//eslint.config.js
const js = require("@eslint/js");
const typescript = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const imports = require("eslint-plugin-import");
const jsxAlly = require("eslint-plugin-jsx-a11y");
const prettier = require("eslint-config-prettier");
const reactJSXRuntime = require("eslint-plugin-react/configs/jsx-runtime");
const reactRecommended = require("eslint-plugin-react/configs/recommended");
const reactHooks = require("eslint-plugin-react-hooks");
const storybook = require("eslint-plugin-storybook");
const globals = require("globals");


module.exports = [
	reactRecommended,
	reactJSXRuntime,
	{
		settings: {
		react: {
			version: "detect",
		},
	},
	languageOptions: {
		ecmaVersion: "latest",
		globals: {
			JSX: true,
			...globals.browser,
			...globals.node,
			...globals.jest,
		},
		parserOptions: {
			sourceType: "module",
			ecmaFeatures: {
				jsx: true,
			},
		},
	},
	ignores: [
		"!.*.js",
		"!.storybook",
		"package.json",
	],
	plugins: {
		"react-hooks": reactHooks,
		"jsx-a11y": jsxAlly,
		import: imports,
		prettier,
	},
	rules: {
		...js.configs.recommended.rules,
		...jsxAlly.configs.recommended.rules,
		...reactHooks.configs.recommended.rules,
		"react/prop-types": "off",
		"no-console": "warn",
		"no-debugger": "warn",
		"no-useless-concat": "error",
		"no-nested-ternary": "error",
		"no-useless-return": "error",
		"object-shorthand": ["error", "always"],
		"import/no-default-export": "error",
		...prettier.configs.recommended.rules,
	},
	{
		files: ["src/**/*.@(ts|tsx)"],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				project: "./tsconfig.json",
			},
		},
		plugins: {
			"@typescript-eslint": typescript,
			typescript,
		},
		rules: {
			...typescript.configs["eslint-recommended"].rules,
			...typescript.configs["recommended"].rules,
			...typescript.configs["recommended-requiring-type-checking"].rules,
			"@typescript-eslint/no-unused-vars": "warn",
			"import/no-unresolved": "off",
		},
	},
	{
		files: ["src/**/stories.@(ts|tsx)"],
		plugins: {
			storybook,
		},
		rules: {
		...storybook.configs.recommended.overrides[0].rules,
		},
	},
	{
		files: [".storybook/main.js"],
		plugins: {
			storybook,
		},
		rules: {
		...storybook.configs.recommended.overrides[1].rules,
		},
	},
	{
		// Files which requires a default export
		files: [
			"**/stories.*",
			"src/storybook/**/*.*",
			"src/pages/**/*.tsx",
			"additional.d.ts",
			"src/test-utils/**/*",
			"**/introspection.ts",
		],
		rules: {
			"import/no-anonymous-default-export": "off",
			"import/no-default-export": "off",
		},
	},
];
```

- EsLint es un sistema modular, con un ecosistema de plugins. Las reglas que el propio ESLint recomienda están en el paquete `eslint:recomended`. En eslintrc bastaba con incluir el string `eslint:recommended` en la lista de plugins. En flat config, las reglas de ESLint se han movido a una dependencia independiente, que debemos instalar: `@eslint/js`

Crear un repo con la configuracion completa que quiero usar

- Más o menos opinionada?
  - Siempre se puede sobreescribir

---

- **Recomendaciones de EsLint**: `eslint:recommended` (línea 5) contiene una serie de reglas que el equipo de EsLint, después de analizar muchísimos proyectos, considera de utilidad en la mayoría de casos. En el sistema legacy, están incluidas dentro de EsLint. Así que lo primero que hacemos es incluir estas reglas.

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
