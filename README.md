## María Simó's Site 2022

This is the repository of my new site, which I'm building in public. You can check the progress here and at [mariasimo.codes](https://mariasimo.codes)

The stack is NextJs static w/ Typescript.
Posts are markdown files under `/content/notes`.
Github Actions are set to deploy when pushing or making PR to the `main` branch.

**Scripts:**

```bash
    # Builds the static files we're serving on Vercel
    "build": "next build && next export",

    # Starts development server
    "dev": "next dev",

    # Lints files
    "lint": "eslint --ext .js,.jsx,.ts,.tsx src --max-warnings=0",
    "lint:fix": "yarn lint --fix",

    # Runs after the installation of dependencies, setting up .git/hooks
    "postinstall": "npx simple-git-hooks"
```

## Learn More

https://twitter.com/mariasimocodes
