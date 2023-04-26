---
title: 'Guía de ESLint, parte 1: cómo usar ESLint con confianza'
metaTitle: 'Guía de ESLint, parte 1: cómo usar ESLint con confianza'
metaDescription: 'El linter más popular del ecosistema de Javascript se renueva con flat config, una nueva API de configuración más simple y potente. En este artículo, revisamos el sistema legacy para sacar el mayor partido de la migración a flat config'
socialImage: '/images/eslint-guide-04-2023/og.png'
published: '19/04/2023'
status: 'draft'
language: 'es'
tags:
  - 'Guide'
  - 'Tools'
  - 'DX'
  - 'Linter'
  - 'Code standards'
  - 'NPM dependency'
---

_ESLint_ es una herramienta con la que convive cualquier persona que desarrolla en el ecosistema de Javascript. Pero, ¿realmente la conocemos? Revisamos a fondo el sistema actual de configuración _ESLint_ antes de migrar a _flat config_, su nuevo sistema.

---

## Motivaciones y plan para esta guía

El objetivo de esta serie de artículos es explicar **cómo compartir nuestra configuración de _ESLint_ como una dependencia externa** para automatizar los estándares de código del equipo de front de [Z1 Digital Studio](https://z1.digital/).

Al empezar a investigar para hacer esto, descubrí que _ESLint_ está en el proceso de lanzar un nuevo sistema de configuración llamado **_flat config_** (que traduciría en algo así como "configuración plana"). Este sistema ya es funcional, tiene soporte en la CLI y documentación oficial disponible desde la versión 8.23.0. Viene a sustituir a **eslintrc** (en adelante el sistema _legacy_ o tradicional), que perderá soporte a partir de la versión 9. En [este enlace](https://github.com/eslint/eslint/issues/13481) puedes consultar del proceso de implementación.

**_Flat config_** propone cambios drásticos en la manera en la que configuramos _ESLint_ en los proyectos. Así que merece la pena hacer una pequeña disgresión para aprender sobre la nueva configuración antes de lanzarnos a crear nuestra dependencia externa. Así podemos liderar su adopción y evitamos refactorizar cuando el cambio sea efectivo.

Este artículo asume que has usado _ESLint_ con anterioridad, aunque quizás no hayas entrado en el detalle de cómo funciona o todo lo que puede ofrecer.

El plan para esta serie de artículos es el siguiente:

**Parte 1. Dominando _ESLint_**. Primero aprenderemos todo lo necesario del sistema legacy para sacar el mayor partido del proceso de migración. Así podemos usar _ESLint_ con confianza y control.

**Parte 2. Migrando a flat config**. Descubrimos los cambios esenciales que propone la flat config, y migramos nuestro caso práctico al nuevo sistema.

**Parte 3. Creando una shareable config de _ESLint_**. Profundizamos en las _shareable configs_ y el ecosistema de dependencias de _ESLint_. Incorporamos otras herramientas de análisis estático. Empezamos a configurar nuestro repositorio como dependencia NPM.

**Parte 4. Mejorando la experiencia con herramientas adicionales**. Añadimos gestión de versiones y de dependencias. Creamos un READMe para documentar y facilitar el uso de nuestra dependencia. Exploramos la creación de una CLI para complementarla.

## Qué es ESLint y porqué es importante

_ESLint_ es una herramienta de análisis estático de código. Frente a las herramientas de análisis dinámico, como el testing, que necesita ejecutar el código para darnos un resultado, es capaz de analizar nuestro código sin ejecutarlo. De forma que nos ayuda a mantener y mejorar la calidad del código que escribimos al tiempo que lo escribimos.

> _ESLint_ es una herramienta que nos ayuda a mantener y mejorar la calidad del código que escribimos al tiempo que lo escribimos

Es la herramienta más popular en su categoría, que incluye otras como _Prettier_, _StyleLint_, _CommitLint_... o el _type checker_ de _Typescript_. Vamos a configurar estas herramientas en el inicio del proyecto y nos van a asistir de manera continuada durante su desarrollo. Lo ideal es ejecutarlas en diferentes fase del proceso (en el IDE, al hacer commit, en nuestro pipeline de integración continua...), para asegurarnos de que cumplimos con los estándares de calidad que hemos establecido.

Y, ¿de qué manera nos ayuda _ESLint_ a crear y mantener estándares de calidad? Lo primero es que **no toma decisiones por nosotros**, sino que deja de nuestra mano, de la mano del equipo, convenir en qué va a definir la calidad del código. Automatiza nuestras opiniones en base a reglas, y nos advierte cuando una de estas reglas se incumple.

Todo esto se expresa en uno o más archivos de configuración, donde declaramos las reglas que van a aplicar al proyecto. Normalmente también nos vamos a apoyar en una extensión de _ESLint_ para nuestro IDE, para obtener un feedback inmediato. Sin esta extensión, tendríamos que confiar únicamente en la CLI de _ESLint_ para la revisión del código.

El valor que obtenemos de _ESLint_ depende en gran medida del esfuerzo que invertimos en entenderlo. Muchas veces se adopta por inercia, trasladando de manera ciega las mismas configuraciones de un proyecto a otro, sin control sobre qué dicen esas reglas sobre el diseño de nuestro proyecto.

En los peores casos, _ESLint_ se puede convertir en un enemigo que nos grita y no entendemos porqué: "si mi código funciona, ¿de qué se queja _ESLint_ ahora?". Entonces se comporta como una sobrecarga de configuraciones que no sabemos cómo manejar y que nos hará odiar la amalgama de líneas onduladas rojas y amarillas que campa a sus anchas por los archivos del proyecto.

Pero cuando lo usamos de la manera correcta, _ESLint_ es un super poder. Nos ayuda a mantener una consistencia a lo largo de la base de código y durante toda la vida de la aplicación, mejorando su diseño y mantenibilidad.

> Si, una y otra vez, nos encontramos corrigiendo o comentando un error recurrente con el equipo, es probable que exista una regla de _ESLint_ que podemos añadir para automatizar la solución. Las mejores convenciones son las que se automatizan.

Escribir software es una actividad de equipo. Como equipo, acordamos buenas prácticas y convenciones que nos permitan trabajar juntos y avanzar con paso rápido y seguro. Estas convenciones pueden incluir preferencias de sintaxis y nombrado, convenciones de estilo, prevención de errores lógicos o de sintaxis, detección de usos obsoletos de código, uso o evitación de ciertos patrones, entre otros.

Pero cualquier norma, por buena que sea, no sirve de nada si el equipo no es capaz de aplicarla de manera constante. Aquí es donde _ESLint_ brilla, porque permite **alinear al equipo en torno a estas convenciones, que quedan documentadas en el archivo de configuración, y al mismo tiempo les libera de tener que recodarlas** y aplicarlas cada vez.

## Anatomía de la configuración de ESLint

Antes de empezar con el caso práctico, revisamos las principales propiedades del objeto de configuración de _ESLint_:

### Las reglas

Las [reglas de _ESLint_](https://eslint.org/docs/latest/use/configure/rules) (`rules`) están pensadas para ser completamente independientes las unas de las otras, activarse y desactivarse de forma individual. _ESLint_ es una herramienta con la que imponer automáticamente nuestras visiones sobre el código, así que no hay regla que no podamos desactivar. Todo está sujeto a opinión, y dependerá de nuestras necesidades. Las reglas adminten tres posibles grados de severidad: "error", "warn" y "off". Pueden aceptar un array para configurar algunas opciones de forma más precisa. Muchas de ellas cuentan con capacidad de _autofix_, para corregir el error de forma automática.

### Overrides

La propiedad `overrides` es muy importante en el sistema legacy, y también va a tener un papel destacado en la **flat config**. Se trata es un array que acepta una lista de objetos que nos sirven para definir configuraciones específicas para subconjuntos de archivos. Para definir cada subconjunto usamos las propiedades `files` y `excludeFiles`. Estas propiedades toman como valor expresiones _globs_ **relativas al directorio** donde se localiza el archivo de configuración.

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

Overrides es una funcionalidad alternativa y más entendible frente al diseño en cascada, muy característico de _ESLint_, en el que profundizaremos en la parte 2 de esta serie.

### Extends key vs plugins key

Hay algo que resulta bastante extraño en _ESLint_, y que más de una vez me ha causado confusión, es porque tenemos dependencias llamas `eslint-plugin-foo` y otras llamadas `eslint-config-foo`. Y porque en unas ocasiones se indica que tenemos que usarlas con `extends`, y otras con `plugins`.

Como hemos dicho, _ESLint_ es un sistema modular y configurable. Podemos instalar reglas adicionales para configurar nuestro caso de uso perfecto. Estas reglas vienen empaquetadas en dependencias NPM con el nombre de `eslint-plugin-[my-plugin]`. Para usarlas, las instalamos y pasamos el nombre al array de plugins: `plugins: ["my-plugin"]` (no es necesario usar el prefijo `eslint-plugin-`).

Pero esto no hace que nuestras reglas estén activas automáticamente. Cuando pasamos el valor al array de `plugins`, simplemente las estamos haciendo disponibles al sistema para su uso. Entonces podemos activar las que queramos en la propiedad `rules`:

```js
// .eslintrc.js

module.exports = {
  plugins: ['my-plugin'],
  rules: {
    // Las reglas van prefijadas con el nombre del plugin
    'my-plugin/some-available-rule': 'error',
  },
};
```

Aquí es donde entran en juego las _shareable configs_ (en adelante, _configs_). Para ahorrarnos el trabajo tedioso de tener que activar reglas una a una, existen otras dependencias de NPM con el nombre de `eslint-config-[my-config]`, que activan directamente un conjunto de reglas pre-definidas al incluirlas en en array de `extends`: `extends: ["my-config"]` (no es necesario usar el prefijo `eslint-config-`)

Las _configs_ pueden usar uno o varios _plugins_ por debajo, pueden extenderse de otras _configs_ y añadir por nosotros, además de reglas, cualquier otra configuración necesaria para su buen funcionamiento.

```js
module.exports = {
  // the plugin is enabled under the hood and some recommended rules are applied
  extends: ['my-config/recommended'],
};
```

Finalmente, es habitual que los plugins que se comparten como dependencias traigan también consigo un set de _configs_ que los autores han considerado de utilidad y que podemos usar en `extends`. Por ejemplo, `eslint-plugin-react` incluye como configs `recommended`, `typescript`, `jsx-runtime`, etc.

Esto puede resultar confuso, al exportar en una misma dependencia, de tipo plugin, tanto el propio plugin como un conjunto de configs. Pero resulta de lo más conveniente, porque nos permite tanto extender de una configuración pre-definida como aplicar reglas individuales.

Para usar una config importada de un plugin, seguimos la sintáxis: `plugin:[name-plugin]/[name-config]`

```js
module.exports = {
  extends: ['plugin:my-plugin/recommended', 'plugin:my-plugin/strict'],
  plugin: ['my-plugin'],
  rules: {
    'my-plugin/some-additional-rule': 'error',
  },
};
```

En resumen:

- Las **_configs_** pueden contener todo lo que se pueda añadir a un archivo de configuración de _ESLint_, vienen paquetizadas como `eslint-config-<my-config>` y se pasan a la propiedad `extends`. Son la manera en la podemos compartir y reusar configuraciones "listas para consumir", y ahorrarnos el trabajo de crearlas nosotros.

- Los **_plugins_** añaden nuevas reglas al sistema. Vienen paquetizados como `eslint-plugin-<my-plugin>` y se pasan a la propiedad `plugins`, para poder activar reglas de forma individual en `rules`. También pueden exportar configs para activar conjuntos pre-definidos de esas reglas.

### Otras root keys

Además de `rules`, `overrides`, `extends` y `plugins`, la configuración de _ESLint_ incluye otras propiedades, como `env`, `settings`, `parser`, `parserOptions`, etc., que son esenciales para la funcionalidad de _ESLint_, a la hora de definir el comportamiento de plugins, hacer que **ESLint** sea capaz de interpretar diferentes sintaxis, reconozca variables de entorno, etc. Veremos las más habituales a continuación, en nuestro caso práctico. Podemos fijarnos en su configuración, porque en la **flat config** (parte 2) se van a transformar y reorganizar.

## Un caso práctico

¡Pasemos a la acción! En esta sección, vamos a crear incrementalmente una configuración de _ESLint_ real, aunque simplificada para fines de ejemplo, que usamos para proyectos en producción con el siguiente _stack_:

- React
- Typescript
- Storybook
- Testing

Una de los signos de identidad de ESLint, responsable en buena medida de su éxito, es su extensibilidad. El ecosistema de _ESLint_ está formado por una gran variedad de plugins y configuraciones disponibles como paquetes NPM que podemos importar para establecer nuestro caso de uso.

En ocasiones puede abrumar la cantidad de dependencias que tenemos que instalar para configurar un proyecto[^1]. A cambio, la ventaja es que podemos instalar exactamente lo que necesitemos:

### Recomendaciones de _ESLint_

`eslint:recommended` contiene una serie de reglas que el equipo de _ESLint_, después de analizar muchísimos proyectos, considera de utilidad en la mayoría de casos. Así que lo primero que hacemos es incluir estas reglas en nuestra configuración. En el sistema tradicional, están incluidas dentro de _ESLint_, así que no es necesario instalar nada.

```js
//.eslintrc.js

module.exports = {
  extends: ['eslint:recommended'],
};
```

### Prettier

_Prettier_ es un formateador, _ESLint_ es un linter. Los formateadores son más rápidos y menos "inteligentes" que los linters, porque no entran a valorar la lógica del código. Se encargan reescribirlo siguiendo reglas de formateo puramente visual (tabs, espacios, puntos y comas, largos de línea...). Mientras que los linters entienden la lógica y la sintáxis, y nos dan indicaciones de acuerdo a cada una de las reglas activadas.

Cuando usamos _Prettier_ y _ESLint_ juntos, dado que _Eslint_ contiene reglas de formateo, necesitamos instalar algo como `eslint-config-prettier`, para desactivar esas reglas e indicar a _ESLint_ que _Prettier_ va a ser el encargado del formateo. `prettier` deberá figurar como la última de nuestras extensiones, para resolver cualquier posible conflicto a su favor.

El plugin `eslint-plugin-prettier` y variantes no están recomendandas en la gran mayoría de casos. Hacen que _Prettier_ se comporte como una regla del linter, lo cual es mucho más lento. No hay necesidad de hacerlo así cuando tenemos configurado _Prettier_ como herramienta independiente.

**Cuando usamos _Prettier_ y _ESLint_ en el mismo proyecto, es importante que permitamos que cada herramienta realice la tarea que mejor sabe hacer**.

```js
//.eslintrc.js

module.exports = {
  extends: [
    'eslint:recommended',
    // otras extensiones que usemos
    'prettier',
  ],
};
```

### React

Instalaremos un par de plugins para incluir las reglas relacionadas con React y para que _ESLint_ sea capaz de entender `jsx`, que no es una sintáxis nativa en Javascript: `eslint-plugin-react` y `eslint-plugin-react-hooks`. Éste último viene de manera separada porque hubo un tiempo en que los hooks no eran parte de React.

Los plugins necesitan conocer la version de React, porque de ello puede depender su funcionamiento, así que usamos `settings` para indicar a _ESLint_ que mire en el `package.json`.

Usamos las configuraciones recomendadas en `extends`. Además añadimos a `extends` `plugin:react/jsx-runtime`, otra configuración que nos ayuda a desactivar las reglas que requieren que importemos `React` al inicio de cada archivo, lo cual no es necesario a partir de React 17.

Todas las configuraciones que hemos extendido, incluyen la opciones de parseo para que _ESLint_ sea capaz de interpretar `jsx`. Aún así, lo añadimos de forma explícita al archivo para mayor claridad.

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
    // Aquí podemos activar manualmente reglas para los archivos de React
  },
};
```

### Typescript

Para que _ESLint_ sea capaz de entender los archivos de _Typescript_, necesitamos instalar `@typescript-eslint`, que contiene un parser y un montón de reglas recomendadas para trabajar con _Typescript_. En este caso, necesitamos hacer uso de `overrides` y crear un bloque donde pasamos _globs_ para capturar los archivos con extensiones `.ts` y `.tsx`.

Vamos a extender la configuración recomendada, `plugin:@typescript-eslint/recommended`, pero también un segundo grupo de reglas, `plugin:@typescript-eslint/recommended-requiring-type-checking`, que hacen que _ESLint_ sea capaz de [usar la información de tipos para detectar errores](https://typescript-eslint.io/linting/typed-linting). Para que funcione, tenemos que facilitar a _ESLint_ la información de tipos. Lo hacemos con `project: true`, que indica a _ESLint_ que busque el `tsconfig.json` más cercano.

También vamos a extender `plugin:@typescript-eslint/eslint-recommended`. Lo que hace es desactivar las reglas de `eslint:recommended` que ya están controladas por _Typescript_, para evitar duplicidades.

```js
// .eslintrc.js

module.exports = {
  // Aqui van las propiedades generales que definimos con anterioridad
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
        // Aquí podemos activar manualmente reglas para los archivos de Typescript
      },
    },
  ],
};
```

### Storybook

Instalamos el plugin oficial de Storybook para _ESLint_, que contiene reglas con las mejores prácticas para el tratamiento de las historias y del directorio de configuración `.storybook`: `eslint-plugin-storybook`. Por defecto, las reglas de este plugin solo aplican a los archivos que coincidad con los patrones: `*.stories.*` (recomendado) o `*.story.*`. Así que es **muy importante que los nombres de los archivos de nuestras historias sigan esta convención**, o el plugin no tendrá efecto.

En _ESLint_, los archivos que empiezan por punto no se analizan por defecto. Así que también necesitamos añadir el directorio `.storybook` a la lista de archivos que queremos analizar. Usamos un patrón con negación en `ignorePatterns` para que _ESLint_ sea capaz de encontrar este directorio:

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
  // El resto de propiedades generales
  overrides: [
    // Overrides para archivos Typescript
  ],
};
```

### Accesibilidad

Usamos `eslint-plugin-jsx-a11y` para que nos ayude a detectar potenciales errores de accessibilidad en nuestros componentes de React. Simplemente extendemos las configuración recomendada.

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
  // El resto de propiedades definidas
  overrides: [
    // Bloque para archivos Typescript
  ],
};
```

### Imports

Con `eslint-plugin-import` podemos prevenir una serie de errores relaciones con la importación y exportación de módulos. Necesitaremos instalar `eslint-import-resolver-typescript` para tener soporte de Typescript.

Activamos algunas reglas específicas para este plugin:

- A nivel estilístico, `import/sort` nos va a servir para ordernar y dividir en grupos los imports al principio de nuestros archivos de manera automática, con lo cual va a ser mucho más facil entender las importaciones y evitar mantenerlas manualmente.
- Activamos `import/no-extraneous-dependencies` para lanzar un error si importamos dependencias que no estén definidas en nuestro package.json
- Activamos `import/no-default-export` porque preferimos usar _named exports_. En algunos casos, como en las historias necesitamos permitir los _default exports_, así que vamos a habilitar un bloque en _overrides_ para manejar este tipo de excepciones.

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
    // Necesitamos estos settings para que ESLint sea capaz de resolver nuestros imports
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

Para que nuestra configuración de _ESLint_ sea capaz de interpretar los archivos de testing, también necesitamos hacer algunas adiciones, que dependerán de las herramientas que estemos usando.

- **Jest**. Para usar Jest necesitamos activar en `env` la variable global jest, para que _ESLint_ sea capaz de reconocerla. También necesitamos permitir que nuestros `mocks` contengan `default exports`.

```js
// .eslintrc.js

module.exports = {
  // Propiedades y reglas generales...
  overrides: [
    // Resto de bloques...
    {
      files: ['**/__tests__/**', '**/__mocks__/**'],
      env: {
        jest: true,
      },
    },
    {
      files: [
        // Resto de paths...
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

- **React Testing Library**. Instalamos dos plugins: `eslint-plugin-testing-library` y `eslint-plugin-jest-dom`. Los usamos solo para nuestros archivos de testing:

```js
// .eslintrc.js

module.exports = {
  // Propiedades y reglas generales...
  overrides: [
    // Resto de bloques...
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

- **Cypress**. Para Cypress instalaremos otro plugin que solo analizará los archivos de la carpeta `/cypress`. En las `parserOptions` del bloque de _Typescript_ vamos a modificar `project` para incluir la configuración de tipos de _Cypress_:

```js
// .eslintrc.js

module.exports = {
  // Propiedades y reglas generales...
  overrides: [
    // Resto de bloques...
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
Et voilá 🎉! Aquí tenemos nuestro archivo final de configuración, integrando todas las partes que mencionamos y añadiendo algunos detalles, como la activación de un puñado de reglas individuales.

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

## Tips para configurar el IDE y los scripts

Ahora que tenemos lista la configuración para el proyecto, podemos atender a otros aspectos que nos ayuden a la experiencia de uso de ESLint.

En primer lugar, podemos configurar Visual Studio Code en el contexto de nuestro proyecto, para que todos los miembros del equipo trabajen en un entorno con el mismo comportamiento. En la raíz del proyecto, creamos un directorio `.vscode` con dos archivos:

- Uno llamado `extensions.json`, en el que podemos incluir las extensiones que recomendamos instalar, _ESLint_ y _Prettier_. Estas extensiones integran las capacidades de estas herramientas en nuestro IDE, para informarnos de errores y warnings, y facilitar su resolución.

```json
//.vscode/extensions.json
{
  "recommendations": ["esbenp.prettier-vscode", "dbaeumer.vscode-eslint"]
}
```

![Screencapture of VSCode with a pop-up window which recommends to install ESLint extension](/images/eslint-guide-04-2023/vscode-recommended.png 'Visual Studio Code nos mostrará una ventana pop-up al abrir el proyecto con las extensiones recomendadas')

- Otro llamado `settings.json`, donde podemos configurar algunas funcionalidades que mejoren nuestra experiencia de desarrollo. Al guardar, _ESLint_ corregirá todos los errores posibles y _Prettier_ formateará nuestro código.

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

Por último necesitamos configurar un par de scripts de _ESLint_ en nuestro `package.json`, a fin de poder integrarlo en las distintas fases del proceso de desarrollo: al hacer commit, en el pipeline de CI, etc.

```json
{
  "scripts": {
    "lint": "eslint . --max-warnings 0 --report-unused-disable-directives --ignore-path .gitignore",
    "lint-fix": "pnpm lint -- --fix"
  }
}
```

Éstas son algunas opciones útiles que podemos pasar al comando:

- `--max-warnings 0`. En _ESLint_, una regla activada con un nivel de severidad `warn`, va a dar un aviso pero va a permitir que nuestro código compile. Esto puede hacer que el equipo interiorice que es posible y está bien ignorar las advertencias de _ESLint_. Como no queremos eso, no permitimos warnings.
- `--report-unused-disable-directives`.En ocasiones, tenemos casos donde nos vemos obligados a desactivar alguna regla para un archivo o una línea concreta con un comentario tipo `/* eslint-disable */`. Esta opción es muy útil, porque nos va a avisar de los comentarios de desactivación de _ESLint_ que hayan quedado obsoletos debido a refactors, etc.
- `--ignore-path .gitignore` nos permite indicar a _ESLint_ qué archivos no nos interesa analizar, por ejemplo `node_modules`.

**Siguientes pasos 👋**

En la parte 2 de esta guía, veremos como migrar nuestra configuración al nuevo sistema de _ESLint_, la **flat config**.

[^1]: Además de los plugins y configuraciones que se mencionan a continuación, otros que podrían ser interesante revisar para incluir nuestra aplicación son el plugin de NextJs, el plugin de SonarLint para escribir código limpio y `eslint-plugin-filenames` para ayudarnos a establecer convenciones de nombrado de archivos y directorios.

## References

- [Flat config announcement, part 1](https://eslint.org/blog/2022/08/new-config-system-part-1/)
- [Flat config announcement, part 2](https://eslint.org/blog/2022/08/new-config-system-part-2/)
- [Flat config implementation roadmap](https://github.com/eslint/eslint/issues/13481)
- [ESLint Docs: Using a configuration from a plugin](https://eslint.org/docs/latest/use/configure/configuration-files#using-a-configuration-from-a-plugin)
- [ESLint Docs: Ways to extend](https://eslint.org/docs/latest/extend/ways-to-extend)
- [Different between extends and plugins](https://prateeksurana.me/blog/difference-between-eslint-extends-and-plugins/)
- ["Prettier vs. Linters" - Prettier docs](https://prettier.io/docs/en/comparison.html)
- ["Stop using _ESLint_ for formatting" - Joshua K. Goldberg at React Miami 2023](https://www.youtube.com/live/mPPZ-NUnR-4?feature=share&t=26572)
- [Usar tabs en prettier por accesibilidad](https://github.com/prettier/prettier/issues/7475)
- [No-floating-promises vs no-void](https://mikebifulco.com/posts/eslint-no-floating-promises)
