---
title: 'Guía de Eslint, parte 4: mejorando nuestra NPM dependency'
metaTitle: 'Guía de Eslint, parte 4: mejorando nuestra NPM dependency'
metaDescription: 'Creando una NPM dependency'
socialImage: '/images/eslint-flat-config-19-04-2023/og.png'
published: '25/04/2023'
status: 'draft'
language: 'es'
hideFromList: true
tags:
  - 'Tools'
  - 'DX'
  - 'Linter'
  - 'Code standards'
  - 'NPM dependency'
---

Qué es una shareable config. El problema de las peer dependencies.Cómo compartir configuraciones de ESLint como dependencia externa. Organización del código. Flexibilidad, múltiples exports. Incorporación de otros linters, como Prettier y Stylelint, Commitlint.

Readme de airbnb styleguide - stylguide como palabra clave

---

Qué pasa si queremos luego sobreescribir algunas reglas de la config?? Necesitamos instalar el plugin a parte???

## El fix más esperado de EsLint: el problema de la resolución de dependencias

En el sistema tradicional se añadió una nueva clave, `extends`, que permitió importar otras configuraciones para extender la nuestra. Esto fue un paso importante porque hizo posible que las configuraciones de EsLint se pudieran distribuir como paquetes de npm, lo que EsLint llama "shareable configs", y es una forma muy popular en la que usamos hoy EsLint.
El equipo de eslint creo `eslint:recommend` una serie de normas que consideraban necesarias para todos los proyectos y que originalmente venían incluidas por defecto en EsLint. Esto permitió separarlas y usarlas de manera específica.
Pero pronto las shareable configs presentaron un problema de resolución de dependencias. Esto obligaba a los usuarios que creaban shareable configs para compartir públicamente o dentro de sus compañías, a tener que listar todas las peerDependencies de las que dependía la config y que los usuarios las tuvieran que instalar de manera independiente. Tener que instalar 10 plugins además de la config, no es ideal porque hace que tener una configuración instalable pierda un poco el sentido.
Los usuarios de EsLint empezaron a quejarse de esto en una issue enorme que podéis ver aquí, pidiendo que las configs pudieran comportarse como un node module normal y resolver las dependencias por si mismas sin tener que instalar nada aparte.

Además, la fijar la extensión del archivo a .js como única posibilidad, permite que ahora los usuarios de EsLint podamos usar `import` o `require` en el archivo de configuración, resolviendo bastantes de los problemas previos que existían con las shareable configs y la resolución custom de dependencias que EsLint tenía que hacer por diseño.

## Añadir IDE recomendations

¿Donde corresponde esto?
Prettier Vscode

- Crear .vscode folder

```json
//.vscode/extensions.json
{
  "recommendations": ["esbenp.prettier-vscode", "dbaeumer.vscode-eslint"]
}

//.vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,

  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },

  "typescript.tsdk": "node_modules/typescript/lib"
}

```

## References

Traer lo necesario de obsidian

- [Storybook Day 2023](https://www.youtube.com/watch?v=P0hJm5v8TJw)
- [The future of Storybook in 2023](https://storybook.js.org/blog/future-of-storybook-in-2023/)
- [Storybook 7 Docs](https://storybook.js.org/blog/storybook-7-docs/)
- [Improved type safety in Storybook 2023](https://storybook.js.org/blog/improved-type-safety-in-storybook-7/)
- [Component Story Format 3 is here](https://storybook.js.org/blog/storybook-csf3-is-here/)

## Backlinks

- [Guía para crear una dependencia de EsLint con Flat Config (Parte 1)](./guide-eslint-dependency-part-1-flat-config)
