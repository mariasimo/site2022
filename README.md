## María Simó's Site 2022

This is the repository of my new site, which I'm building in public. You can check the progress here and at [mariasimo.codes](https://mariasimo.codes)

The stack is NextJs static w/ Typescript, I'm fetching dynamic content from Contentful and deploying with Vercel. I set up a couple of Github Actions, one in charge of deployment when pushing or making PR to the `main` branch. The other one listen for publish events on Contentful to rebuild the site.

**Scripts:**

```bash
    # Builds the static files we're serving on Vercel
    "build": "next build && next export",

    # Starts development server
    "dev": "next dev",

    # Lints files
    "lint": "eslint --ext .js,.jsx,.ts,.tsx src --max-warnings=0",
    "lint:fix": "yarn lint --fix",

    # Generates types for contentful data
    "codegen": "contentful-typescript-codegen --output src/@types/generated/contentful.d.ts",

    # Runs after the installation of dependencies, setting up .git/hooks
    "postinstall": "npx simple-git-hooks"
```

## Learn More

https://twitter.com/mariasimocodes
