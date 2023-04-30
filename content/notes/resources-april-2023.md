---
title: 'Recursos y lecturas del mes de Abril'
metaTitle: 'Recursos y lecturas del mes de Abril'
metaDescription: 'Este mes de abril me ha dejado mucho tiempo para leer, pensar e investigar. Reúno aquí algunos de los artículos y lecturas que no quiero perder.'
socialImage: '/images/eslint-guide-04-2023/og-1.png'
published: '30/04/2023'
status: 'draft'
language: 'es'
tags:
  - 'Resources'
  - 'Articles'
  - 'Recommendations'
  - 'Learning'
---

Este mes de abril me ha dejado mucho tiempo para leer, pensar e investigar sobre temas nuevos y pendientes. Reúno aquí algunos de los artículos y lecturas que me parece interesante compartir, con vosotros y conmigo en algunas semanas o meses.

---

## Articulos

![Book shaped as a stairs. Illustration by Javier Jaen](/images/resources-04-2023/javier-jaen.jpeg?width=content 'Ilustración del maravilloso Javier Jaen - javierjaen.com')

### Arquitectura y testing

#### 📝 _Modularizing React Applications with Established UI Patterns_, Juntao QIU. Martin Fowler's blog (Inglés)

Total highlight of the month. Si leeis un sólo artículo de esta lista que sea [éste](https://martinfowler.com/articles/modularizing-react-apps.html). Es difícil encontrar información sobre arquitectura en el front, especialmente aplicada a React. Este artículo conecta realmente bien la teoría con direcciones prácticas sobre como estructurar nuestra aplicación.

#### 📝 _PresentationDomainData layering_, Martin Fowler. Martin Fowler's blog (Inglés)

¿He dicho ya que amo a este señor? Referido en el artículo anterior, está [este otro artículo](https://martinfowler.com/bliki/PresentationDomainDataLayering.html) en el que Fowler apunta su propuesta de capas para una aplicación web. También muy interesante.

#### 🎥 _The Art of Front-end Architecture_, Adrià Fontcuberta. JS World 2021 (Español)

En relación con lo anterior, Pedro Mareke me recomendó [esta charla](https://www.youtube.com/watch?v=HtLAWkVTWgs) de Adrià Fontcuberta. Para empezar a pensar en tratar el framework de UI como un mecanismo de entrega, en lugar de como el core de la aplicación.

#### 📖 🎥 _Domain modeling made functional_, Scott Wlaschin (Inglés)

Por mi trayectoría, mi experiencia con la programación orientada es prácticamente nula. Es por eso que me cuesta mucho conectar con mucha de la información que existe sobre DDD y arquitecturas limpias. [@MarcosNASAG](https://twitter.com/MarcosNASAG) me recomendó un libro que acerca el DDD al paradigma de la programación funcional. Ya he leído los primeros capítulos y me está encantando. Especialmente, cómo pone el acento en crear un lenguaje común con el cliente y los miembros no técnicos del equipo, y el código debe (y puede) hablar en estos mismos términos.

> What if the domain experts, the development team, other stakeholders, and (most importantly) the code source itself all share the same model?

El autor además tiene una capacidad increíble para trasladar estas ideas de manera que parecen simples y evidentes.

Si tenéis dudas sobre conseguir el libro, [Dani Santamaría](https://twitter.com/dsantaka) me recomendó una charla en la que el autor presenta las ideas principales.

- [Charla - KanDDDinsky 2019](https://www.youtube.com/watch?v=2JB1_e5wZmU)
- [Libro - The Pragmatic Bookshelf](https://pragprog.com/titles/swdddf/domain-modeling-made-functional/)

#### 🎥 _Una historia de testing_, Julio César Pérez (Español)

No había visto [esta charla](https://www.youtube.com/watch?v=nv9ZPEsBVw4) de [Julio César](https://twitter.com/jcesarperez) y me ha encantado.Las conversaciones en torno al testing suelen estar repletas de _buzzwords_ y superioridad moral. La charla de Julio relata una experiencia realista y cercana sobre el viaje de un equipo para aprender testing y mejorar el modo en que trabajan.

### React and the one with the dead SPAs

Hace algunas semanas React publicó por fin su nueva documentación, y no ha estado falta de polémica. Parece que React apuesta, a través de su asociación cada vez más cercana con NextJS, por lo que se ha llamado "una vuelta al servidor" y una nueva etapa de "aplicaciones híbridas". Con _Create React App_ deprecado y _Vite_ arrinconado en un apartado colapsable de la documentación, ¿donde quedan las SPAs en 2023? ¿ya no es aconsejable usar React sin un _metaframework_? ¿Qué opciones hay para las aplicaciones y dashboard que viven detrás de un login? ¿Es todo un espejismo causado por el _bleeding edge_ de _Twitter_?

Aquí algunas lecturas sobre el tema:

#### 🧵 _Nextjs SPA example_, Dan Abramov (Inglés)

Con su profusión habitual, Dan Abramov ha estado hablando de este tema durante las últimas semanas. Merece la pena darse una vuelta por su perfil de Twitter y (tratar de) seguir la conversación. En [este hilo](https://twitter.com/dan_abramov/status/1636886736784457734), ofrece una solución para crear una SPA con NextJs, con una muestra de código.

#### 📝 _The Web’s Next Transition_, Kent C. Dodds (Inglés)

El bueno de Kent no podía faltar. Un [artículo](https://www.epicweb.dev/the-webs-next-transition) salpicado de acrónimos que te cuenta de donde venimos y, según él, hacia donde vamos. Según él, hacia algo que ha acuñado como PESPAs.

#### 📝 _How to start a React Project in 2023_, Robin Wieruch (Inglés)

Un [artículo](https://www.robinwieruch.de/react-starter/) claro y directo, que presenta varias opciones en el escenario actual.

"[The new React documentation proposal] For many it seemed too much influenced by politics, too heavy on (meta) framework lock-ins, too focused on SSR, and **too far away from the problems a normal tech worker faces in their daily work** outside of the bleeding edge Twitter bubble."

#### 📝 _New react docs pretends SPAs don't exists anymore_, Matija Sosic (Inglés)

"But what about typical Single Page Apps (SPAs)? Dashboard-like tools that live behind the auth (and don’t need SEO at all), and for which React was originally designed, still very much exist".
[Enlace](https://wasp-lang.dev/blog/2023/03/17/new-react-docs-pretend-spas-dont-exist)

#### 📝 _SPAs: theory versus practice_, Nolan Lawson (Inglés)

Más sobre las diferencias entre SPAs y MPAs. [Enlace](https://nolanlawson.com/2022/06/27/spas-theory-versus-practice/)

#### 📝 React, rethinking best practices, Frontend Mastery

Sobre el fin del dominio absoluto del _client-side only_ en React, la vuelta al servidor, los React Server components y las aplicaciones híbridas. [Enlace](https://frontendmastery.com/posts/rethinking-react-best-practices/)

### Un poco de esto y de aquello

#### 📝 Developers way

#### 📝 Rebuilding a featured news section with modern CSS: Vox news, Ahmad Shadeed

- Rebuilding a featured news section with modern CSS: Vox news, Ahmad Shadeed - https://ishadeed.com/article/rebuild-featured-news-modern-css/

#### 📝 Crafting the new Nextjs

https://rauno.me/craft/nextjs

#### Don't become an architect astrounat

- Don't become an architect astrounat - Maxi Ferreira https://www.maxiferreira.com/blog/architecture-astronauts/

#### Are pull requests bad because they originate from open-source development? by Mark Seemann

https://blog.ploeh.dk/2023/04/24/

#### Lo de chakra

https://blog.ploeh.dk/2023/04/24/

#### La charla de Jaime Obregon

- Chakra y sus planes de futuro https://www.adebayosegun.com/blog/the-future-of-chakra-ui

### Tooling y Shameless plug

#### 📝 _Lo nuevo de la nueva versión Storybook_

Lo de mi romance con Storybook este mes. Storybook publicó su versión 7 hace unas semanas. Cómo venía cargada de novedades, me vi la presentación que hicieron para [Storybook day](https://www.youtube.com/watch?v=P0hJm5v8TJw) y escribí un artículo con mis notas. Para mi sorpresa, el equipo de Storybook me contactó para proponerme hacer una traducción al inglés y compartirlo en sus redes. Lo mejor de todo ha sido descubrir _Storybook_ como comunidad: un equipo super talentoso, generoso y dispuesto a recibir de la forma más calida a los que empezamos a hacer nuestras primeras contribuciones open source.

- [Articulo](http://localhost:3000/es/storybook-7-new-release)
- [Storybook Discord](https://discord.com/invite/storybook)

#### 📝 _Guía de ESLint, parte 1: cómo usar ESLint con confianza_

La primera parte de una guía sobre ESLint que va desde las bases hasta la creación de una dependencia para externalizar la configuración y reusarla entre proyectos. Me gustaba ESLint y he aprendido mucho más sobre la herramienta, documentándome para escribir el artículo. En el artículo podéis encontrar un montón de referencias adicionales, entre ellas la muy reciente charla que Josh Golberg, uno de los maintainers de `typescript-eslint` dio en la React Miami hace apenas una semana.

- [Articulo](http://localhost:3000/es/guide-eslint-part-1-eslint-legacy)
- [Josh Golberg talk](https://www.youtube.com/live/mPPZ-NUnR-4?feature=share&t=25765)

### No todo es código

#### 📝 _La carretera fanstasma, Nacional III_

Un reportaje sobre una de las antiguas carreteras nacionales que llevaban a los madrileños a la playa en los 90, y sobre las formas de vida que se han extinguido con la construcción de la autovía. Los testimonios y las fotos cuentan una historia nostálgica pero sin sentimentalismos sobre el progreso de ayer y el progreso de hoy.

#### 🎥 Jorge Luis Borges sobre el inglés

Estas semanas, que he estado leyendo, escribiendo y traduciendo del español al inglés, y de vuelta, me han hecho pensar en las limitaciones (y posibilidades) de cada lenguaje. La experiencia de cómo un idioma que aprendemos nos transforma, cómo nos abre caminos para pensar. Hay cosas que pueden ser pensadas y dichas más fácilmente en unos idiomas que en otros. [El lenguaje configura el pensamiento](https://es.wikipedia.org/wiki/Hip%C3%B3tesis_de_Sapir-Whorf?useskin=vector) — “la lengua no es la envoltura del pensamiento, sino el pensamiento mismo”, dijo Unamuno. Creo que esto, como programadores, lo sabemos bien.

Aquí [un video Jorge Luis Borges](https://twitter.com/i/status/1645382039401816065) hablando sobre qué encuentra en el inglés que no encuentra en el castellano.

![Screencapture of a video clip with Jorge Luis Borges, talking about the english language. There's caption: "English is, i think, the most physical of languages"](/images/resources-04-2023/borges-english.png?width=content)

> _English is, i think, the most physical of languages. For example "he loomed over", you can’t say that in Spanish. And in English you can do almost anything with verbs and prepositions, for example "to laugh off", "to dream away","to live down" something… "to live up to" something - you can’t say those things in Spanish_
