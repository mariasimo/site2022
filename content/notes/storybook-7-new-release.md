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

Storybook está a punto de liberar una nueva _mayor_ después de dos años que incluye importantes cambios en la escritura de stories, nuevas formas de documentación y multitud de posibilidades para hacer testing dentro de nuestras stories.

---

## Qué es Storybook

Storybook es una herramienta para el desarrollo, documentación y testeo de la UI de nuestra aplicación. Las UIs modernas están formadas por componentes. Con Storybook podemos desarrollarlos en un entorno aislado de nuestra aplicación, para asegurar su calidad desde todos los ángulos posibles.

También es la herramienta idónea para la documentación de sistemas de diseño, es una fuente de verdad perfecta en la comunicación entre diseñadores y desarrolladores.

Poco a poco a pasado de ser una herramienta de nicho a un estándar de la industra para el desarrollo de UIs.

## Cambios esenciales en la nueva versión

Los Storybooks dentro de nuestras aplicaciones son mucho más extensos y sofisticados que hace algunos años. Por eso el equipo de Storybook ha orientado sus esfuerzos a mejorar la ergonomía de la herramienta en esta nueva versión. En tres aspectos:

- Un diseño renovado de la interfaz
- Una manera más simple de escribir historias
- Mejor soporte de Typescript

### Un diseño renovado de la interfaz

En cuanto a la renovación del diseño, pasa por un cambio en el set de iconos, el rediseño y consolidación de los menus flotantes y otro montón de tweaks que van a mejorar el aspecto y la experiencia de uso de la interfaz. El cambio más notable es la desapariciónde ubicación del tab de "Docs" en el menu superior de nuestras historias, que pasa a integrarse en el menu lateral, como veremos más adelante en el apartado de [Documentación](#documentación).

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

Como vemos, en CFS2 era necesario especificar una función de renderizado para cada una de nuestras historias (línea 50). En CSF3 ya no hace falta, la historia se convierte simplemente en un objeto, no es necesaria ninguna declaración adicional.

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

Ahora Storybook es capaz de leer la ubicación de nuestros archivos y mapear la estructura de directorios de nuestra app. El árbol de archivos que vemos en nuestro IDE, Storybook lo va a reproducir tal cual. De esta manera nos olvidamos de cómo tener que organizar nuestras historias y obtenemos la mayor consistencia de experiencia entre nuestro IDE y Storybook.

![Fuente "Component Story Format 3 is here", Storybook blog](/images/storybook-18-03-2023/storybook-tree.png)

- TS mejor soporte. safety y autocompletado
  Ahora es más sencillo escribir historias con TS. En nuestras stories queremos autocompletado y errores cuando nuestras stories no cumplan el contrato de tipado.

Storybook ha creado dos nuevos tipos para ayudarnos con eso, Meta y StoryObj.

```tsx
const meta: Meta<typeof Button> = {
  component: Button,
};
export default Meta;

type Story = StoryObj<typeof Button>;
export const Primary: Story = { args: { primary: true } };
```

Para los casos donde nuestros args están repartidos entre el meta y las stories, tenemos que tipar de otra manera, para que TS sea capaz de seguir el hilo (la cascada):

```tsx

const meta = {
	component: Button,
	args: {
		label: "Default"
	}
} satisfies Meta<typeof Button>

export default
type Story = StoryObj<typeof meta>



```

## Documentación

Docs cambia su ubicación para que pensemos en la documentación de otra manera: de story level a component level.

- **Autodocs**. La documentación se genera automática en base a nuestras historias. Esta es una feature que pasa a ser opcional, y tenemos que explicitar que queremos general autodocs. Lo hacemos pasando una prop al objeto meta en nuestras historias:

```tsx

const meta = {
	component: Button,
	tags: ["autodocs"],
} satisfies Meta<typeof Button>

```

- **Personalizar autodocs**. Podemos personaliza la documentación generada a través de nuestras historias. Podemos usar comentarios y usar las opciones de `parameters.docs`.

```tsx
/** Use JsDoc comment to add a description for documenting your story*/
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

- **Crear documentación personalizada**. Si queremos un control total sobre la documentación, podemos usar MDX. MDX es markdown con components, no es algo propio de SB, es un estándar de la industria. SB usa MDX2. Con MDX podemos crear páginas de documentación independientes, para introducir nuestro sistema, o asociadas a nuestra historia.

## Testing en SB7

Anatomía de un test de componente:

- Aislar el componente y preparar un test case.
- Simular las interacciones con herramientas como React Testing Library
- Ejecutar aserciones con herramientas como Jest

Muchas veces tenemos que hacer un montón de trabajo previo para renderizar los componentes de manera aislada en nuestros tests (mockear providers, routers, datos...) cuando en SB ya tenemos ese trabajo hecho.

Además en el entorno de Node, donde corren nuestros test, no tenemos ningún feedback visual cuando algo va mal.

**Storybook Interaction Tests** te permite escribir test directamente en las stories y ejecutarlos en el browser.
Cada una de nuestras stories es en sí misma un test case, y ya estamos testando que nuestro componente se comporta como esperamos.

Añadir tests con Jest y Testing Library es una manera de amplificar la experiencia de testeo que ya supone escribir historias. Con esto podemos simular la interacción del usuario en el browser y hacer aserciones. Para ello usamos la nueva anotación de story `play`:

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

En lugar de escribir nuestro test en un archivo a parte, lo podemos escribir directamente en nuestra historia. Es posible gracias a que Storybook nos provee de wrappers para Jest y TS para poder usarlos en el entorno del browser.

Para visualizar el resultado de nuestros tests tenemos un nuevo panel, Interactions, donde podemos emular los pasos de la interacción y debuguear nuestros tests.

SB provee un test runner que funciona con Playwright en caso de que queramos convertir las interacciones de SB en tests que correr de manera headless. Esto es muy útil si queremos integrar nuestros tests en un pipeline de CI.

Parece una solución genial para integrar una vez que el equipo esté más maduro con el tema de los tests:
https://storybook.js.org/addons/@storybook/test-runner
https://storybook.js.org/tutorials/ui-testing-handbook/

Nulla facilisi. Pellentesque vel placerat enim, ut auctor leo[^1]. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque in tincidunt quam. Sed aliquam lectus at nibh placerat, eu auctor sem fringilla. Cras ligula neque, egestas varius est eu, mattis placerat risus. Nulla efficitur est et dolor condimentum tempor. Nullam accumsan fermentum lacus. Fusce id leo sapien. Donec non dolor in leo maximus volutpat vel id orci.

```javascript
export default function TableOfContents({ className }: { className?: string }) {
  return (
    <Container className={className}>
      <Title>Table of Contents</Title>
      <div>
        {sections.map((s, idx) => (
          <Section key={`${s}-${idx}`}>{s}</Section>
        ))}
      </div>
      <Links>
        <ArrowLink label="Go to Top" link="#" />
        <ArrowLink label="Go Home" link="#" />
      </Links>
    </Container>
  );
}
```

Praesent sed nulla a enim imperdiet rutrum. Ut non enim non erat lacinia condimentum a quis ex. Morbi et facilisis sapien. Nullam mi nulla, elementum at elementum a, rutrum quis nulla. Suspendisse ac laoreet felis. Vestibulum varius libero ut arcu posuere lobortis. Sed pharetra porttitor interdum. Duis laoreet lectus et purus ornare vulputate. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce lacinia pellentesque sem, sit amet sollicitudin diam tristique faucibus. Aliquam rutrum dictum ligula a tempus. Aenean vitae semper arcu.

Nulla facilisi. Pellentesque vel placerat enim, ut auctor leo [^2]. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque in tincidunt quam. Sed aliquam lectus at nibh placerat, eu auctor sem fringilla. Cras ligula neque, egestas varius est eu, mattis placerat risus. Nulla efficitur est et dolor condimentum tempor. Nullam accumsan fermentum lacus. Fusce id leo sapien. Donec non dolor in leo maximus volutpat vel id orci.

[^1]: This is the first footnote.
[^2]: Pellentesque in tincidunt quam. Sed aliquam lectus at nibh placerat, eu auctor sem fringilla.

## References

- [Some link](http://somelink.com)

## BackLinks

- [Some internal link](/react-testing-library)
