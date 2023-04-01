---
title: "What's new in the new Storybook"
metaTitle: "What's new in the new Storybook"
metaDescription: 'Storybook is about to release a new mayor after two years, which introduces meaningful changes related to the writing of stories, new ways of documentation, and lots of possibilities for testing inside the tool.'
socialImage: '/images/storybook-18-03-2023/og.png'
published: '01/04/2023'
status: 'draft'
language: 'en'
tags:
  - 'Tools'
  - 'DX'
  - 'UI development'
---

_Storybook_ is about to release a new mayor after two years, which introduces meaningful changes related to the writing of stories, new ways of documentation, and lots of possibilities for testing inside the tool.

---

## What is Storybook

_Storybook_ is a tool we use to develop, document, and test the UI of our app. Modern UIs are built using components, and _Storybook_ promotes a _Component-Driven Development_ approach. It helps us work on our components in an isolated environment, separated from the main app, to ensure their quality from every angle.

It is also the most suitable choice for documenting design systems. It serves as the perfect source of truth connecting the work of designers and developers.

From its roots as a niche tool, it has become an industry standard in the development of visual interfaces.

## Fundamental changes in the new version

The _storybooks_ within our apps are now much larger and more sophisticated than some years ago. That's why the _Storybook_ team has focused their efforts on improving ergonomics for this new version. On three main aspects:

- A renovated interface design
- A more simple way to write stories
- A better support for Typescript

### A renovated interface design

The interface has been the subject of a restyling. It includes a new icon set, the redesign and consolidation of floating menus, and lots of tweaks aimed at improving its general look and experience of use. Most significant change is the disappearance of the "Docs" tab from the story upper menu, relocated in the side menu. We will see this in more detail in the section of [Documentation](#documentation-in-storybook-7).

### A more simple way to write stories

_Storybook_ uses a format called _Component Story Format_ (CSF) to write stories. With the new release of _Storybook_ 7, we can now use CSF 3, which means we can write stories with much less code

> In the new version of _Storybook_, the syntax of the story becomes a simple object, with no need for any additional declarations.

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

The default export (lines 2 and 11) is known as _meta_. It specifies the general characteristics of the component. The named export (lines 7 and 12) represents the story. It specifies the inputs needed to create a particular component state that we're interested in documenting.

With CFS 2, we had to include a render function for each one of our stories (line 7). With CSF 3 that is no longer necessary. The syntax of the story becomes a simple object, with no need for any additional declarations.

Nonetheless, stories accept a render property in case we want to override certain component behavior for a specific story. To do that:

```tsx
export const Primary = {
 render: (args) => <Button {...args} specialProp={specialProp}/>
 args: { primary: true }
}
```

Now that stories are pure objects, we can extend them from a previous story using Javascript `spread`:

```tsx
export const Tertiary = {
  ...Primary,
  args: { primary: true },
};
```

Another interesting novelty is that, from now on, **we can spare the `title` attribute from the _meta_ object**. Typically, we've used `title` to indicate the title and the location of our story in the contents tree. We indicated title with a simple string ("Button"), and location with a path format ("Atoms/Button").

_Storybook_ can now read the location and structure of our app files, just like we see it in our IDE. This means we no longer need to worry about organizing stories, and we'll have a much nicer consistent experience between our IDE and _Storybook_.

![Source "Component Story Format 3 is here", Storybook blog](/images/storybook-18-03-2023/storybook-tree.png 'Source "Component Story Format 3 is here", Storybook blog')

### A better support for Typescript

Typing stories in _Storybook_ had a common issue where it couldn't detect when we missed required properties in a component's story. This meant that the help we got from Typescript in _Storybook_ was limited, not strongly typed.

We face this limitation because stories can get their arguments from both the _meta_ object and the story itself. Here's an example:

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
    planName: 'Premium',
  },
} as Meta;

const Template: Story<Props> = (args) => <PlanCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  // price is required, so we should have an error here
  planDescription: 'Zero to conversational in a month.',
};
```

If you would check, you'll see the property `args` in the `Default` story gets typed as `Partial<Props>`, which means we can't tell which properties are missing

The release of version 7, includes two new types, `Meta` and `StoryObj`, that will allow for auto-completion and error detection when a story doesn't meet the component's types. The easiest way to type a stories with these new types is:

```tsx
const meta: Meta<typeof Button> = {
  component: Button,
};
export default Meta;

type Story = StoryObj<typeof Button>;
export const Primary: Story = { args: { primary: true } };
```

But to fix the issue we mentioned earlier, where `args` are shared between _meta_ and stories, we need to type differently, to help Typescript understand. We can use the new [`satisfies`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html) operator in Typescript to our advantage.

```tsx

import { PlanCard } from ".";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: PlanCard,
  args: {
    planName: "Premium"
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

📎 [You can inspect types in this CodeSandbox](https://codesandbox.io/s/storybook-7-typescript-7n394n?file=/src/PlanCard/stories.ts:0-309)

## Documentation in Storybook 7

As we mentioned earlier, in the new version of _Storybook_, the location of the _Docs_ changes. They are no longer in the upper menu of each story but have been integrated into the contents tree, as the first story of each component. This change reflects the _Storybook_ team intention to makes us, users, more aware of this resource.

Most of times, our components are self-descriptive but, on some situations, we want to provide more detailed documentation. For example, if we're working on a design system or when our _Storybook_ will be used by various stakeholders, and we need to be more thorough. In cases like those, we have docs to our disposal.

![Source "Storybook 7 Docs", Storybook blog](/images/storybook-18-03-2023/sb-7-docs.png 'Source "Storybook 7 Docs", Storybook blog')

There are different options to document your components:

- Autodocs
- Custom documentation

### Autodocs

The _autodoc_ is a template automatically generated for each of our files. It includes examples and descriptions of the stories we create for the component. This feature is optional. If we want to generate _autodocs_, we need to be explicit about it. We do that by passing a prop to the _meta_ object:

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

If what we want is complete control over documentation, we can use _MDX_. _MDX_ is a combination of markdown and the ability to render components, and it's an industry-standard syntax that's not specific to _Storybook_. _Storybook_ 7 uses _MDX_ 2. With _MDX_ we can create documentation pages that tied to a specific story or independent — if we want to introduce our system and provide general info.

📎 [More on documentation at Storybook](https://storybook.js.org/blog/storybook-7-docs/)

## Testing with Storybook 7

_Storybook_ can be considered a testing tool in its own right. But it has also been incorporating more and more integrations that enable different types of testing, including unit and integration tests, directly within its framework. I can imagine this might be particularily useful for teams specialized in UI development, because it will allow them to focus all their testing efforts in one place within the application, and save them setting up and integrating multiple testing tools, which can often lead to overlaps and redundancies.

In order to create a component test, we do three steps:

- Isolate the component and set up a test case.
- Emulate interaction with tools like _Testing Library_.
- Make assertions with tools like _Jest_.

Often, we do tons of work just to render the components in an isolated manner in our tests (mocking providers, routers, data...), when we can leverage the work we've already done in our stories, which provide an isolated and visual way to render our components. Besides, our tests typically run in a _Node_ environment, where we won't receive any visual feedback when something goes sideways.

The idea with **_Storybook_ Interaction Tests** is to write our tests directly inside the stories and execute them in the browser. Each one of the stories we create is a test case in itself, where first thing we do is render the component and check everything behaves they way we expect.

Then, we can use the new story property `play` and write the test directly in our story. In the test, we simulate user interaction in the browser and make assertions. _Storybook_ provide us with wrappers for _Jest_ and _Testing Library_, which makes possible their use in a browser-based environment.

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

> Adding tests with _Jest_ and _Testing Library_ is a way of augment the testing experience of writing stories.

To visualize the result of our tests, there's a new panel, `Interactions`, where we can run each interaction step and debug our tests.

![Source "Component Story Format 3 is here", Storybook blog](/images/storybook-18-03-2023/sb-7-tests.gif 'Source "Component Story Format 3 is here", Storybook blog')

For this to be a viable testing option, we need a way to integrate these tests into the continuous integration pipeline of our application. _Storybook_ offers a [test runner](https://storybook.js.org/addons/@storybook/test-runner) that transforms all the story-level interactions into tests that we can run in headless mode. This test runner also includes options for generating coverage reports. And, when a test fails, it prints a direct link to the _Storybook_ story that is failing so we can quickly visualize the error address the issue.

While it works with _Playwright_ behind the scenes, which kind of forces us to get familiar with a new tool and add it to our stack, looks like a option worthy of further exploration.

_Storybook_ features a complete section of [documentation about testing](https://storybook.js.org/tutorials/ui-testing-handbook/) on their site.

## So, when do we start?

At the moment, _Storybook_ stable version remains 6.5. and the team is polishing [the finishing details](https://github.com/orgs/storybookjs/projects/8?ref=storybook-blog) before the release. We can start testing the new version by installing `storybook@next`. If we want to start learning about the migration process, _Storybook_ has provided [a guide](https://chromatic-ui.notion.site/Storybook-7-migration-guide-dbf41fa347304eb2a5e9c69b34503937) a guide covering all the necessary changes.

Although the new version presents numerous interesting changes, just the time and code savings that the new format for writing stories will bring, makes me eager to have the opportunity to integrate it into a new project.

## References

- [Storybook Day 2023](https://www.youtube.com/watch?v=P0hJm5v8TJw)
- [The future of Storybook in 2023](https://storybook.js.org/blog/future-of-storybook-in-2023/)
- [Storybook 7 Docs](https://storybook.js.org/blog/storybook-7-docs/)
- [Improved type safety in Storybook 2023](https://storybook.js.org/blog/improved-type-safety-in-storybook-7/)
- [Component Story Format 3 is here](https://storybook.js.org/blog/storybook-csf3-is-here/)
