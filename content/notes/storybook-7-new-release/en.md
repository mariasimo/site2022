---
title: "What's new in the new Storybook"
metaTitle: "What's new in the new Storybook"
metaDescription: 'Storybook is about to release a new mayor after two years, introducing meaningful changes about how stories are written, new documentation methods and lots of possibilities for testing within the very same workshop'
socialImage: '/images/storybook-18-03-2023/og.png'
published: '18/03/2023'
status: 'draft'
language: 'en'
tags:
  - 'Tools'
  - 'DX'
  - 'UI development'
---

_Storybook_ is about to release a new mayor after two years, introducing meaningful changes about how stories are written, new documentation methods and lots of possibilities for testing within the very same workshop.

---

## What is Storybook

_Storybook_ is a tool for developing, documenting, and testing the UI of our application. Modern UIs are made up of components, and as such, _Storybook_ has driven a philosophy of _Component-Driven Development_. It allows us to develop our components in an isolated environment separate from the main application to ensure their quality from every possible angle.

It is also the most suitable tool for documenting design systems because it serves as the perfect source of truth in communication between designers and developers.

From its roots as a niche tool, it has become an industry standard in the development of visual interfaces.

## Fundamental changes in the new version

The _storybooks_ inside our applications are now much more large and sophisticated than some years ago. That's why the _Storybook_ team has put their efforts into improve the ergonomics of the tool for this new version. On three principal aspects:

- A renovated interface design
- A more simple way to write stories
- A better support for Typescript

### A renovated interface design

The interface has been the subject of a restyling, including a change in the icon set, the redesign and consolidation of floating menus and a whole lot more of tweaks aimed at improving its general look and experience of use. The most notable change is the disappearance of the "Docs" tab from the story upper menu, to be integrated within the side menu. We will see this in more detail in the section of [Documentation](#documentation-in-storybook-7).

### A more simple way to write stories

The syntax we use for writing stories in the _Storybook_ environment is known as _Component Story Format_ (from now on, CSF). _Storybook_ 7 implements a new ligther version of CSF, CSF 3, which will enable is to write stories with a whole lot less of code.

> En the new version of _Storybook_, the syntax of the story becomes a simple object, with no need for any adiditional declarations.

```tsx
// Storybook 6
export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = (args) => <Button {...args} />;
Primary.args = { primary: true };

// Storybook 7
export default { component: Button };
export const Primary = { args: { primary: true } };
```

The default export (lines 2 and 11) it's known as _meta_. It specifies the general characteristics of the component. The named export (lines 7 and 12) is the story, and it specifies inputs to create a particual component state that we're interested in having documented.

With CFS2 we had to include a render function for each one of our stories (line 7). With CSF3 that is no longer necessary. the syntax of the story becomes a simple object, with no need for any adiditional declarations.

Nonetheless, stories accept a property `render`, in case we want to overwrite certain component behavior in a particular story. To do that:

```tsx
export const Primary = {
	render: (args) => <Button {...args} specialProp={specialProp}/>
	args: { primary: true }
}
```

Now that stories are purely object, we can extend them from a previous story using Javascript `spread`:

```tsx
export const Tertiary = {
  ...Primary,
  args: { primary: true },
};
```

Another interesting novelty is that, from now on, **we can spare the `title` attribute from our stories _meta_**. Typically, we have being used `title` to indicate the title and the ubication of our story in the contents tree.

Now, _Storybook_ is able to read the ubication of our application files and map its structure of folders. It's able to recreate the app files tree of our app as we see it in our IDE. This way, we can stop thinking about how to organize stories and have a much nicer consistent experience between our IDE and _Storybook_.

![Source "Component Story Format 3 is here", Storybook blog](/images/storybook-18-03-2023/storybook-tree.png "Source "Component Story Format 3 is here", Storybook blog")

### A better support for Typescript

A typical issue with the typing of stories has been that _Storybook_ was not able to show an error when we omit required properties in the story of the component. So the help we receive from Typescript inside _Storybook_ was very limited, not being strongly typed.

We encounter this limitation because stories can receive some of its arguments through the _meta_ object and some through the story itself. An example:

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
  // price is required, so we should have an error here
  planDescription: 'Zero to conversational in a month.',
};
```

In this common case, the property `args` in our story is typed as `Partial<Props>`, so it's just not possible to know which properties are missing.

Now, version 7 comes with two types, `Meta` and `StoryObj`, that will make possible having autocompletion and errores when stories don't fulfill the types contract of the component.
The easiest way to type a stories with these new types is:

```tsx
const meta: Meta<typeof Button> = {
  component: Button,
};
export default Meta;

type Story = StoryObj<typeof Button>;
export const Primary: Story = { args: { primary: true } };
```

To solve the problem we mentioned about, when `args` are shared between _meta_ and stories, we need to type differently, so Typescript is able to follow along. We take advantage from the new Typescript operator [`satisfies`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html).

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
    // now we have autocompletion and errors 🎉
   planDescription: 'Zero to conversational in a month.',
  }
};

```

![Autocompletion for stories at Storybook 7](/images/storybook-18-03-2023/storybook-7-ts-autocompletado.png 'Autocompletion for stories at Storybook 7')

![Type errores for stories at Storybook 7](/images/storybook-18-03-2023/storybook-7-ts-errores.png 'Type errores for stories at Storybook 7')

As we see in the images above, now we do have autocompletion and error detection. The type of `args` is a much more complex union now, with `planName` noted as optional, because Typescript gets that we have already specified it at the _meta_ level.

📎 [Example code sandbox](https://codesandbox.io/s/storybook-7-typescript-7n394n?file=/src/PlanCard/stories.ts:0-309)

```ts
// This is the types that Typescript is able to infer now 👏
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

## Documentation in Storybook 7

We mentioned it earlier, the _Docs_ change its location for the new version. They will now longer can be found in the upper menu of each story. They move to be integrated in the contents tree, as the first of the stories of each component. This change reflects the _Storybook_ team intention to makes us users more aware of this resource.

Most of times, our components are self-descriptive but, on some situations, we do want to document more carefully. For example, if we're working on a design system and/or our _Storybook_ is going to be referred by different _stakeholders_ and we need to be more exhaustive. In that case, we have docs to our dispossal.

![Source "Storybook 7 Docs", Storybook blog](/images/storybook-18-03-2023/sb-7-docs.png "Source "Storybook 7 Docs", Storybook blog")

There are different options to document your components:

- Autodocs
- Custom documentation

### Autodocs

The _autodoc_ is a template which is automatically generated for each one of our files. It includes examples and descriptions of the stories we create for the component. It's an optional feature. If you want to generate _autodocs_, we need to be explicit about it. We do that by passing a prop to the _meta_ object:

```tsx
const meta = {
  component: Button,
  tags: ['autodocs'],
};
```

In case we want to go a step further, we can customize the _autodocs_. We can do that in two ways:

- By adding _JSDoc_ comments, which will transform in the descriptions of our story inside the documentation.
- Using the options `parameters.docs` provide us with.

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

### Custom documentation

However, if what we are looking for is complete control over documentation, we can use _MDX_. _MDX_ is markdown which also can render components. It's not a synxtax created by _Storybook_, but an industry standard. _Storybook_ 7 uses _MDX_ 2. With _MDX_, we can create pages of documentation, independent of any story, to introduct our system, or tied to an specific story.

📎 [More on documentation at Storybook](https://storybook.js.org/blog/storybook-7-docs/)

## Testing with Storybook 7

_Storybook_ can be considered a testing tool in itself. But, beyond its own capabilities, it has been including more and more integrations which enable doing different types of testing directly within the tool framework, including unitary and integration tests. This might be particularily interesting for teams specialized in UI development, because it will allow them to focus all testing effort in one place within the application, and save them the set up and integration, with the inavoidable overlap, of different testing tools.

In order to create a component test, we do three steps:

- Isolate the component and set up a test case.
- Emulate interaction with tools like _Testing Library_.
- Make assertions with tools like _Jest_.

Often, we need to do tons of work just to render the components in an isolated manner in our tests (mocking providers, routers, data...), when we have that already working in our component stories. Besides, our test typically run in a _Node_ environment, so we don't receive any visual feedback when something goes sideways.

The idea with **_Storybook_ Interaction Tests** is to write our tests directly inside the stories and execute them in the browser. Each one of the stories we create is a test case in itselft, where first thing we do is render the component and check everything behaves they way we expect.

Then, we can use the new story property `play` and write the test directly in our story. In the test, we simulate user interaction through the browser and make assertions. _Storybook_ provide us with wrappers for _Jest_ and _Testing Library_, which makes possible their use in a browser-based environment.

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

> Adding test with _Jest_ and _Testing Library_ is a way of augment the testing experience of writing stories.

To visualize the result of our tests, there's a new panel, `Interactions`, where we can run each interaction step and debug our tests.

![Source "Component Story Format 3 is here", Storybook blog](/images/storybook-18-03-2023/sb-7-tests.gif 'Source "Component Story Format 3 is here", Storybook blog')

In order for this to be a viable testing option, a way to integrate this tests in the continuous integration pipeline of our application is needed. _Storybook_ offers a [test runner](https://storybook.js.org/addons/@storybook/test-runner) that transform all the story-level interactions into tests that we can run in headless mode. It includes options for generate coverage reports. And, when a test fails, it prints a direct link to the _Storybook_ story that is failing so we can visualize the error.

Though it works with _Playwrint_ behind the scenes, which kind of forces us to get familiar with a new tool and add it to our stack, looks like a option worthy of further exploration.

_Storybook_ features a complete section of [documentation about testing](https://storybook.js.org/tutorials/ui-testing-handbook/) on their site.

## When do we start?

At the moment, _Storybook_ stable version remains 6.5. and the team is polishing [the final details](https://github.com/orgs/storybookjs/projects/8?ref=storybook-blog) before the release. We can start to test the new version by installing `storybook@next`. If we want to start thinking about the migration to this new version, _Storybook_ have put to your disposal [a guide](https://chromatic-ui.notion.site/Storybook-7-migration-guide-dbf41fa347304eb2a5e9c69b34503937) that cover all the changes needed.

Though the new version present itself with a number of interesting changes, the time and code we're saving thanks to the new format for writing stories, makes me impaction to have the change of integrate it in a new project.n nuevo proyecto.

## References

- [Storybook Day 2023](https://www.youtube.com/watch?v=P0hJm5v8TJw)
- [The future of Storybook in 2023](https://storybook.js.org/blog/future-of-storybook-in-2023/)
- [Storybook 7 Docs](https://storybook.js.org/blog/storybook-7-docs/)
- [Improved type safety in Storybook 2023](https://storybook.js.org/blog/improved-type-safety-in-storybook-7/)
- [Component Story Format 3 is here](https://storybook.js.org/blog/storybook-csf3-is-here/)
