---
title: 'Lo nuevo de la nueva versión de Storybook'
metatitle: 'Storybook 7'
metadescription: 'Lo nuevo de la nueva versión de Storybook'
socialImage: ''
published: '18/03/2023'
status: 'draft'
language: 'Spanish'
tags:
  - 'Tools'
  - 'DX'
  - 'UI development'
---

_Storybook_ está a punto de liberar una nueva _mayor_ después de dos años, que incluye importantes cambios en la escritura de historias, nuevas formas de documentación y multitud de posibilidades para hacer testing dentro de la propia herramienta.

---

## Qué es _Storybook_

_Storybook_ es una herramienta para el desarrollo, documentación y testeo de la UI de nuestra aplicación. Las UIs modernas están formadas por componentes, y _Storybook_ ha impulsado una filosofía de _Component Driven Development_. Permite desarrollar nuestros componentes en un entorno aislado de la aplicación, para asegurar su calidad desde todos los ángulos posibles.

Es también la herramienta idónea para la documentación de sistemas de diseño, porque se sitúa como una fuente de verdad perfecta en la comunicación entre diseñadores y desarrolladores.

Ha pasado de ser una herramienta de nicho a un estándar de la industria para el desarrollo de UIs.

## Cambios fundamentales de la nueva versión

Los _storybooks_ dentro de nuestras aplicaciones son mucho más extensos y sofisticados que hace algunos años. Por eso el equipo de _Storybook_ ha orientado sus esfuerzos a mejorar la ergonomía de la herramienta en esta nueva versión. En tres aspectos:

- Un diseño renovado de la interfaz
- Una manera más simple de escribir historias
- Mejor soporte de Typescript

### Un diseño renovado de la interfaz

En cuanto a la renovación del diseño, pasa por un cambio en el set de iconos, el rediseño y consolidación de los menus flotantes y otro montón de ajustes que vienen a mejorar el aspecto general y la experiencia de uso de la interfaz. El cambio más notable es la desapariciónde ubicación del tab de "Docs" en el menu superior de las historias, para integrarse en el menu lateral, como veremos en el apartado de [Documentación](#documentación-en-storybook-7).

### Una manera más simple de escribir historias

La sintaxis con la que escribimos historias en el entorno de _Storybook_ se conoce como _Component Story Format_ (en adelante, CSF). _Storybook_ 7 implementa una nueva versión de CSF, CSF3, más ligera, que nos permite escribir historias con mucho menos código.

> En la nueva versión de _Storybook_, la sintáxis de la historia pasa a ser simplemente en un objeto, sin necesidad de ninguna declaración adicional.

```tsx
// En Storybook 6
export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = (args) => <Button {...args} />;
Primary.args = { primary: true };

// En Storybook 7
export default { component: Button };
export const Primary = { args: { primary: true } };
```

La exportación por defecto (líneas 2 y 11) se conoce como _meta_. Especifica cómo es el componente que estamos creando a rasgos generales. El _named export_ (líneas 7 y 12) es la historia y especifica aquellos inputs que crean un estado del componente que estamos interesados en documentar.

En CFS2 era necesaria una función de renderizado para cada una de las historias (línea 7). En CSF3 ya no hace falta. La sintáxis de la historia pasa a ser simplemente en un objeto, sin necesidad de ninguna declaración adicional.

Aunque las historias aceptan una propiedad `render`, por si queremos sobreescribir algún comportamiento concreto del componente para una historia en particular. Lo haríamos así:

```tsx
export const Primary = {
	render: (args) => <Button {...args} specialProp={specialProp}/>
	args: { primary: true }
}
```

Ahora que las historias son puramente objetos, podemos extenderlas a partir de una historia anterior usando `spread`.

```tsx
export const Tertiary = {
  ...Primary,
  args: { primary: true },
};
```

Otra novedad interesante es que, a partir de ahora, **podemos omitir el atributo `title`en el _meta_ de nuestras historias**. Típicamente, empleamos `title` para indicar el título y la ubicación de la historia en el árbol de contenidos.

Ahora _Storybook_ es capaz de leer la ubicación de nuestros archivos y mapear la estructura de directorios de nuestra app. Es capaz de reproducir tal cual el árbol de archivos que vemos en nuestro IDE. De esta manera, podemos dejar de pensar en cómo organizar las historias y obtenemos una experiencia más consistente entre nuestro IDE y _Storybook_.

![Fuente "Component Story Format 3 is here", Storybook blog](/images/storybook-18-03-2023/storybook-tree.png)

### Mejor soporte para Typescript

Un problema habitual en el tipado de las historias ha sido que _Storybook_ no era capaz de lanzar un error cuando no pasábamos propiedades requeridas al componente en la historia. La ayuda que recibíamos de Typescript era muy limitada dentro del ámbito de _Storybook_, por no poseer un tipado fuerte.

Esta limitación viene dada porque las historias pueden recibir parte de sus argumentos a través de su _meta_ y otra parte a través de la propia historia. Por ejemplo:

```tsx
export type Props = {
  planName: string;
  price: number;
  planDescription: string;
};

export default {
  component: PlanCard,
  title: 'General/PlanCard',
  args: {
    planName: 'Intensive',
  },
} as Meta;

const Template: Story<Props> = (args) => <PlanCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  // deberíamos tener un error aquí, porque price es requerido
  planDescription: 'Zero to conversational in a month.',
};
```

En este caso, tan habitual, la propiedad `args` de la historia viene tipada como `Partial<Props>`, de modo que no es posible saber qué propiedades "faltan".

Ahora, la versión 7 incluye dos tipos, `Meta` y `StoryObj`, con los que va a ser posible tener autocompletado y errores cuando las historias no cumplan el contrato de tipado del componente. La manera más simple de tipar una historia con estos tipos sería la siguiente:

```tsx
const meta: Meta<typeof Button> = {
  component: Button,
};
export default Meta;

type Story = StoryObj<typeof Button>;
export const Primary: Story = { args: { primary: true } };
```

Para el caso que mencionamos, donde los `args` están repartidos entre el _meta_ y las _stories_, tenemos que tipar de otra manera, para que Typescript sea capaz de seguir el hilo. Tomamos ventaja del nuevo operador de Typescript, [`satisfies`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html).

```tsx

import { PlanCard } from ".";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: PlanCard,
  args: {
    planName: "Intensive"
  }
} satisfies Meta<typeof PlanCard>

export default meta

export const Default: StoryObj<typeof meta> = {
  args: {
    // ahora vamos a tener autocompletado y errores
   planDescription: 'Zero to conversational in a month.',
  }
};

```

![Autocompletado en las historias de Storybook 7](/images/storybook-18-03-2023/storybook-7-ts-autocompletado.png)

![Errores en las historias de Storybook 7](/images/storybook-18-03-2023/storybook-7-ts-errores.png)

Como vemos en las imágenes, ahora sí vamos a tener opciones de autocompletado y detección de errores. El tipado de `args` es una unión mucho más compleja. Vemos que `planName` es opcional, porque Typescript entiende que ya lo hemos especificado en el **meta**.

📎 [CodeSandox con código de ejemplo](https://codesandbox.io/s/storybook-7-typescript-7n394n?file=/src/PlanCard/stories.ts:0-309)

```ts
// Éste es el tipado que Typescript es capaz de inferir ahora
Partial<{
    planName: string;
    price: number;
    planDescription: string;
}> & {
    price: number;
    planDescription: string;
    planName?: string | undefined;
}

```

## Documentación en _Storybook_ 7

Como apuntábamos arriba, los _Docs_ cambian su ubicación. Ya no se encuentran en el menu superior de cada historia, sino que pasan a formar parte del árbol de contenidos, como la primera de las historias de un componente. Es decir, conceptualmente, los docs se mueven desde un nivel de historia a un nivel de componente. Este movimiento responde a una intención por parte del equipo de _Storybook_ de que seamos más conscientes de este recurso.

La mayoría de las veces nuestros componentes son auto-descriptivos pero, en determinadas situaciones, sí vamos a querer documentar más cuidadosamente. Por ejemplo, si estamos trabajando en un sistema de diseño o nuestro _Storybook_ va a ser consultado y consumido por diferentes _stakeholders_ y necesitamos ser más exhaustivos. En ese caso, tenemos los docs a nuestra disposición.

![Fuente "Storybook 7 Docs", Storybook blog](/images/storybook-18-03-2023/sb-7-docs.png)

Éstas son las distintas opciones que tenemos para documentar nuestros componentes:

- Autodocs
- Documentación personalizada

### Autodocs

El _autodoc_ es una plantilla que se genera automáticamente para cada uno de nuestros archivos, e incluye ejemplos y descripciones de las historias que creamos para el componente. Es una _feature_ opcional. Si queremos generar _autodocs_, tenemos que indicarlo de forma explícita. Lo hacemos pasando una `prop` al objeto _meta_:

```tsx
const meta = {
  component: Button,
  tags: ['autodocs'],
};
```

Si queremos ir un paso más allá, podemos personalizar los _autodocs_. Lo hacemos de dos maneras:

- Añadiendo comentarios con _JsDoc_, que se convierten en las descripciones de nuestra historia en la documentación.
- Usando las opciones de `parameters.docs`.

```tsx
/** This is the description of my story */
export const Primary: Story = {
  args: {
    primary: true,
  },
  parameters: {
    docs: {
      canvas: { sourceState: 'shown' },
    },
  },
};
```

### Documentación personalizada

Si, en cambio, lo que buscamos es un control total sobre la documentación, podemos usar _MDX_. _MDX_ es markdown con la posibilidad de renderizar componentes. No es una sintáxis propia de _Storybook_, sino un estándar de la industria. _Storybook_ usa MDX2. Con _MDX_ podemos crear páginas de documentación independientes, para introducir nuestro sistema, o bien asociadas a nuestra historia.

📎 [Más sobre la documentación en Storybook](https://storybook.js.org/blog/storybook-7-docs/)

## Testing en _Storybook_ 7

_Storybook_ puede considerarse una herramienta de testeo en sí misma. Pero, además, ha ido incluyendo más y más integraciones que permiten hacer diferentes tipos de tests directamente en el marco de la herramienta, incluidos tests unitarios y de integración. Especialmente para equipos especializados en el desarrollo de UI, parece una manera bastante interesante de concentrar los esfuerzos de _testing_ en un solo punto de la aplicacion, y ahorrarnos configurar y hacer convivir, con su lógico solapado, diferentes herramientas de testeo.

Para crear un test de componente, necesitamos tres pasos:

- Aislar el componente y preparar un _test case_
- Simular las interacciones con herramientas como _Testing Library_
- Ejecutar aserciones con herramientas como _Jest_

Muchas veces tenemos que hacer un montón de trabajo previo para renderizar los componentes de manera aislada en nuestros tests (_mockear providers_, _routers_, datos...), cuando en _Storybook_ ya lo tenemos hecho. Además en el entorno de _Node_, donde corren nuestros test, no recibimos ningún _feedback_ visual cuando algo va mal.

**_Storybook_ Interaction Tests** permite escribir tests directamente dentro de las _stories_ y ejecutarlos en el _browser_. Cada una de las historias que creamos es en sí misma un _test case_, donde el primer paso es renderizar y comprobar que todo marcha como esperamos.

Después, podemos usar la nueva propiedad de story `play` y escribir el test directamente en nuestra historia. En el test, simulamos la interacción del usuario en el _browser_ y hacer aserciones. _Storybook_ nos provee de _wrappers_ para _Jest_ y _Testing library_ que hacen posible su uso en el entorno del _browser_.

```tsx
import { within, fireEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await fireEvent.click(canvas.getRoleBy('button'));

    await expect(canvas.getByText('Are you sure?')).toBeInTheDocument();
  },
};
```

> Añadir tests con _Jest_ y _Testing Library_ es una manera de amplificar la experiencia de testeo que ya supone escribir historias.

Para visualizar el resultado, tenemos un nuevo panel, `Interactions`, donde podemos emular los pasos de la interacción y _debuguear_ nuestros tests.

![Fuente "Component Story Format 3 is here", Storybook blog](/images/storybook-18-03-2023/sb-7-tests.gif)

Para que esta manera de testear sea una opción viable, necesitamos poder integrar las pruebas en el _pipeline_ de integración continua de la aplicación. _Storybook_ nos proporciona un [_test runner_](https://storybook.js.org/addons/@storybook/test-runner) que transforma todas las interacciones a nivel de historia en tests que podemos correr en modo _headless_. Incluye opciones para generar informes de cobertura. Además, cuando un test falla, te vincula directamente a la historia de _Storybook_ para poder visualizar el error.

Aunque funciona con _Playwright_ por detrás, lo que nos obliga en cierta medida a familiarizarnos con esta herramienta y añadirla a nuestro stack, es una opción que merece la pena explorar.

_Storybook_ cuenta con toda una sección de [documentación sobre testing](https://storybook.js.org/tutorials/ui-testing-handbook/).

## ¿Cuándo empezamos?

Actualmente la versión estable de _Storybook_ sigue siendo la 6.5. y el equipo está puliendo [los últimos detalles](https://github.com/orgs/storybookjs/projects/8?ref=storybook-blog) para la release. Pero podemos empezar a probar nueva versión si instalamos `storybook@next`. Si queremos empezar a pensar en la migración a la nueva versión, _Storybook_ facilita [una guía](https://chromatic-ui.notion.site/Storybook-7-migration-guide-dbf41fa347304eb2a5e9c69b34503937) con los cambios.

Aunque la nueva versión presenta numerosos cambios interesantes, ya sólo por el ahorro de tiempo y código que va a suponer el nuevo formato para escribir historias, estoy impaciente por tener la oportunidad de integrarla en un nuevo proyecto.

## References

- [Storybook Day 2023](https://www.youtube.com/watch?v=P0hJm5v8TJw)
- [The future of Storybook in 2023](https://storybook.js.org/blog/future-of-storybook-in-2023/)
- [Storybook 7 Docs](https://storybook.js.org/blog/storybook-7-docs/)
- [Improved type safety in Storybook 2023](https://storybook.js.org/blog/improved-type-safety-in-storybook-7/)
- [Component Story Format 3 is here](https://storybook.js.org/blog/storybook-csf3-is-here/)
