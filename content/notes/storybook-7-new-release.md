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

Storybook está a punto de liberar una nueva _mayor_ después de dos años que incluye importantes cambios en la escritura de stories, nuevas formas de documentación y multitud de posibilidades para hacer testing dentro de las stories.

---

## Qué es Storybook

Storybook es una herramienta para el desarrollo, documentación y testeo de la UI de nuestra aplicación. Las UIs modernas están formadas por componentes. Con Storybook podemos desarrollarlos en un entorno aislado de nuestra aplicación, para asegurar su calidad desde todos los ángulos posibles.

También es la herramienta idónea para la documentación de sistemas de diseño, es una fuente de verdad perfecta en la comunicación entre diseñadores y desarrolladores.

Poco a poco a pasado de ser una herramienta de nicho a un estándar de la industria para el desarrollo de UIs.

## Cambios fundamentales de la nueva versión

Los Storybooks dentro de nuestras aplicaciones son mucho más extensos y sofisticados que hace algunos años. Por eso el equipo de Storybook ha orientado sus esfuerzos a mejorar la ergonomía de la herramienta en esta nueva versión. En tres aspectos:

- Un diseño renovado de la interfaz
- Una manera más simple de escribir historias
- Mejor soporte de Typescript

### Un diseño renovado de la interfaz

En cuanto a la renovación del diseño, pasa por un cambio en el set de iconos, el rediseño y consolidación de los menus flotantes y otro montón de tweaks que van a mejorar el aspecto y la experiencia de uso de la interfaz. El cambio más notable es la desapariciónde ubicación del tab de "Docs" en el menu superior de las historias, que pasa a integrarse en el menu lateral, como veremos más adelante en el apartado de [Documentación](#documentación-en-storybook-7).

### Una manera más simple de escribir historias

La sintaxis con la que escribimos historias en el entorno de Storybook se conoce como _Component Story Format_ (en adelante, CSF). Storybook 7 implementa una nueva versión de CSF, CSF3, que nos va a librar de escribir un montón de _boilerplate_ de ahora en adelante.

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

> En la nueva versión de Storybook, la historia se convierte simplemente en un objeto, no es necesaria ninguna declaración adicional.

La exportación por defecto se conoce como _Meta_ y especifica cómo es componente que estamos creando de forma aislada a rasgos generales. El _named export_ es la historia y especifica los inputs que crean un estado con sentido del componente que estamos documentando.

Como vemos, en CFS2 era necesario especificar una función de renderizado para cada una de las historias (línea 50). En CSF3 ya no hace falta, la historia se convierte simplemente en un objeto, no es necesaria ninguna declaración adicional.

Aunque las historias aceptan una propiedad `render` por si queremos sobreescribir algún comportamiento concreto del componente para una historia en particular. Lo haríamos así:

```tsx
export const Primary = {
	render: (args) => <Button {...args} specialProp={specialProp}/>
	args: { primary: true }
}
```

Ahora nuestras historias son puramente objetos, así que podemos extenderlas a partir de una historia anterior usando `spread`.

```tsx
export const Tertiary = {
  ...Primary,
  args: { primary: true },
};
```

Otro cambio interesante es que, a partir de ahora, **podemos omitir el atributo `title`en el Meta de nuestras historias**. Normalmente hemos empleado el atributo `title` para especificar la ubicación y el título de nuestra historia en el árbol de contenidos de Storybook.

Ahora Storybook es capaz de leer la ubicación de nuestros archivos y mapear la estructura de directorios de nuestra app. El árbol de archivos que vemos en nuestro IDE, Storybook lo va a reproducir tal cual. De esta manera nos olvidamos de cómo tener que organizar las historias y obtenemos una experiencia más consistente entre nuestro IDE y Storybook.

![Fuente "Component Story Format 3 is here", Storybook blog](/images/storybook-18-03-2023/storybook-tree.png)

### Mejor soporte para Typescript

Un problema típico en el tipado de las historias ha sido que Storybook no era capaz de lanzar un error cuando no pasábamos propiedades requeridas al componente en nuestra historia, de manera que la ayuda que recibíamos de Typescript era muy limitada dentro del ámbito de Storybook. La razón es que nuestras historias pueden recibir parte de sus argumentos a través de su historia general o "Meta" y otra parte a través de la propia historia. Por ejemplo:

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

Storybook tenía que mantenerse flexible ante ese muy habitual caso de uso, de manera que la propiedad `args` de la historia tenía el tipado `Partial<Props>`.

La versión 7 include dos tipos, `Meta` y `StoryObj`, con los que va a ser más fácil tener autocompletado y errores cuando las historias no cumplan el contrato de tipado del componente.

```tsx
const meta: Meta<typeof Button> = {
  component: Button,
};
export default Meta;

type Story = StoryObj<typeof Button>;
export const Primary: Story = { args: { primary: true } };
```

Para los casos donde nuestros args están repartidos entre el meta y las stories, tenemos que tipar de otra manera, para que Typescript sea capaz de seguir el hilo. En este caso, tomamos ventaja del nuevo operador de Typescript, [`satisfies`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html).

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

Como vemos en las imágenes, ahora sí vamos a tener opciones de autocompletado y detección de errores. El tipado de `args` ahora es una unión mucho más compleja. Podemos ver que `planName` es opcional, porque Typescript entiende que ya lo hemos especificado en el Meta.

📎 [CodeSandox con código de ejemplo](https://codesandbox.io/s/storybook-7-typescript-7n394n?file=/src/PlanCard/stories.ts:0-309)

```ts
// este es el tipado inferido de args ahora
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

## Documentación en Storybook 7

Como apuntábamos arriba, los doscs cambian su ubicación. Ya no se encuentran en el menu superior de cada historia, sino que se pasan a formar parte del árbol de contenidos, como la primera de las historias de un componente. Es decir, conceptualmente, los docs se mueven desde un nivel de historia a un nivel de componente. Este movimiento responde a la intención por parte del equipo de Storybook de que seamos más conscientes de esta herramienta.

La mayoría de las veces nuestros componentes son auto-descriptivos, pero en ocasiones vamos a querer documentar más cuidadosamente (por ejemplo, si estamos trabajando en un sistema de diseño o nuestro Storybook va a ser consultado y consumido por diferentes _stakeholders_, y necesitamos ser más rigurosos). En ese caso, tenemos los docs a nuestra disposición.

![Fuente "Storybook 7 Docs", Storybook blog](/images/storybook-18-03-2023/sb-7-docs.png)

Éstas son las distintas opciones que tenemos para documentar nuestros componentes:

- Autodocs
- Documentación personalizada

### Autodocs

El autodoc es una plantilla que se genera automáticamente para cada uno de nuestros archivos, e incluye ejemplos y descripciones de las historias que creamos para nuestro componente.
Es una feature opcional. Si queremos generar _autodocs_, tenemos que explicitarlo en nuestra historia. Lo hacemos pasando una prop al objeto Meta:

```tsx
const meta = {
  component: Button,
  tags: ['autodocs'],
};
```

Si queremos ir un paso más allá, podemos personalizar los autodocs. Lo hacemos de dos maneras:

- Añadiendo comentarios con JsDoc, que se convierten en las descripciones de nuestra historia en la documentación.
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

Si queremos un control total sobre la documentación, podemos usar MDX. MDX es markdown con components. No es una sintáxis propia de Storybook, es un estándar de la industria. Storybook usa MDX2. Con MDX podemos crear páginas de documentación independientes, para introducir nuestro sistema, o asociadas a nuestra historia.

📎 [Más sobre la documentación en Storybook](https://storybook.js.org/blog/storybook-7-docs/)

## Testing en Storybook 7

Poco a poco Storybook ha ido incluyendo la posibilidad de testar nuestros componentes directamente en dentro de nuestras historias. Es una opción que cada vez me despierta mayor interés. Especialmente para equipos muy especializados en el desarrollo de UI parece una manera bastante interesante de optimizar los esfuerzos del equipo.

Para crear un test de componente, necesitamos tres pasos:

- Aislar el componente y preparar un _test case_
- Simular las interacciones con herramientas como _Testing Library_
- Ejecutar aserciones con herramientas como _Jest_

Muchas veces tenemos que hacer un montón de trabajo previo para renderizar los componentes de manera aislada en nuestros tests (mockear providers, routers, datos...), cuando en Storybook ya lo tenemos hecho. Además en el entorno de Node, donde corren nuestros test, no tenemos ningún feedback visual cuando algo va mal.

**Storybook Interaction Tests** permite escribir tests directamente en las stories y ejecutarlos en el browser. Cada una de las historias que creamos es en sí misma un _test case_, donde el primer paso es renderizar y comprobar que todo marcha como esperamos.

Añadir tests con _Jest_ y _Testing Library_ es una manera de amplificar la experiencia de testeo que ya supone escribir historias. Podemos simular la interacción del usuario en el _browser_ y hacer aserciones. Para ello usamos la nueva propiedad de story `play` y escribir el test directamente en nuestra historia. Storybook nos provee de wrappers para Jest y TS para poder usarlos en el entorno del browser.

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

Para visualizar el resultado de nuestros tests tenemos un nuevo panel, `Interactions`, donde podemos emular los pasos de la interacción y debuguear nuestros tests.

![Fuente "Component Story Format 3 is here", Storybook blog](/images/storybook-18-03-2023/sb-7-tests.gif)

Para que esta manera de testear fuera una opción viable, necesitaríamos además poder integrar estas pruebas en nuestro _pipeline_ de integración continua. Storybook nos proporciona un [_test runner_](https://storybook.js.org/addons/@storybook/test-runner) que transforma todas las interacciones a nivel de historia en tests que podemos correr en modo _headless_. Incluye opciones de code coverage reports, y cuando un test falla te vincula directamente a la historia de Storybook para poder visualizar el error. Aunque funciona con _Playwright_ por detrás, lo que nos obliga en cierta medida a familiarizarnos con esta herramienta y añadirla a nuestro stack, es una opción que puede merecer la pena explorar.

Storybook cuenta con toda una sección de [documentación sobre testing](https://storybook.js.org/tutorials/ui-testing-handbook/).

[^1]: This is the first footnote.
[^2]: Pellentesque in tincidunt quam. Sed aliquam lectus at nibh placerat, eu auctor sem fringilla.

## ¿Cuándo empezamos?

Actualmente la versión estable de Storybook sigue siendo la 6.5. y el equipo está puliendo [los últimos detalles](https://github.com/orgs/storybookjs/projects/8?ref=storybook-blog) para la release. Pero podemos empezar a probar nueva versión si instalamos `storybook@next`. Si queremos empezar a pensar en la migración a la nueva versión, Storybook facilita [una guía](https://chromatic-ui.notion.site/Storybook-7-migration-guide-dbf41fa347304eb2a5e9c69b34503937) con los cambios.

La nueva versión incluye muchos cambios interesantes, pero ya solo con el tiempo que vamos a ahorrar con el nuevo formato para escribir historias, la espera va a merecer la pena.

## References

- [Storybook Day 2023](https://www.youtube.com/watch?v=P0hJm5v8TJw)
- [The future of Storybook in 2023](https://storybook.js.org/blog/future-of-storybook-in-2023/)
- [Storybook 7 Docs](https://storybook.js.org/blog/storybook-7-docs/)
- [Improved type safety in Storybook 2023](https://storybook.js.org/blog/improved-type-safety-in-storybook-7/)
- [Component Story Format 3 is here](https://storybook.js.org/blog/storybook-csf3-is-here/)
