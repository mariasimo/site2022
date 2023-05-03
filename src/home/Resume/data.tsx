import type { ReactNode } from 'react';
import { Bold } from './styles';

type Section = {
  title: string;
  content: Column[];
};

type Column = {
  description?: ReactNode;
  links?: { label: string; link: string }[];
};

const experience: Section = {
  title: 'Experience',
  content: [
    {
      description: (
        <p>
          <Bold>Since March 2021 I've been working at Z1</Bold>, a Sevillian
          digital product agency. I mainly work with TypeScript, React, Apollo
          and GraphQL. I'm a manager of a front-end squad and team up with
          backend, product people, designers and clients. We work together in a
          remote and international context to craft beautiful web apps.
        </p>
      ),
      links: [
        {
          label: 'z1.digital',
          link: 'https://z1.digital',
        },
      ],
    },
    {
      description: (
        <p>
          <Bold>I worked for a year at Secuoyas.</Bold> It was my first
          experience as a developer. I learned the processes involved in
          manufacturing digital products. I worked with Gatsby and Framer Motion
          to develop the website for its principal product.
        </p>
      ),
      links: [
        {
          label: 'secuoyas.com',
          link: 'https://secuoyas.com/',
        },
      ],
    },
    {
      description: (
        <p>
          <Bold>In early 2020 I was a Teacher Assistant at Ironhack</Bold>, for
          the Full-Time Web Development Bootcamp. My role there was to support
          the students and guide them to complete their tasks. But also to
          support them through the challenging experience the bootcamp is.
        </p>
      ),
      links: [
        {
          label: 'ironhack.com',
          link: 'https://www.ironhack.com',
        },
      ],
    },
  ],
};

const education: Section = {
  title: 'Education',
  content: [
    {
      description: (
        <p>
          <Bold>In October 2019 my life changed when I joined Ironhack</Bold> as
          a student. For nine weeks I took in the fundamentals, the current
          practices and tools of contemporary web development. It was a
          thrilling, empowering experience on many levels. I approached learning
          coding by thinking as a designer, with empathy, strategy and care.
        </p>
      ),
    },
    {
      description: (
        <p>
          <Bold>From 2015 to 2019 I managed Copón Studio</Bold> along with my
          partner, where we learned everything by doing it. For almost five
          years, I was an entrepreneur, graphic and ui designer, marketing
          strategist, business manager, sales agent and accounting administrator
          at a local scale. This is the most important educational experience
          I’ve ever had.
        </p>
      ),
    },
    {
      description: (
        <p>
          <Bold>Once upon a time, I studied Arts</Bold> at the University of
          Granada. I also took a couple of web development and graphic design
          courses. I painted for many many years, I was an illustrator for
          children's books and I briefly worked as a concept artist for themed
          parks, but that was a long time ago.
        </p>
      ),
    },
  ],
};

const skills: Section = {
  title: 'Skills',
  content: [
    {
      description: (
        <p>
          Javascript, React, Typescript, NextJS, Gatsby, GraphQL, Apollo, CSS,
          Styled Components, Accessible & Semantic HTML, Storybook, Webpack,
          EsLint, Prettier, Jira, Terminal, Version Control, Figma and Adobe CC.
        </p>
      ),
    },
    {
      description: (
        <p>
          On my soft side, I am a
          creative-strong-willed-detail-oriented-optimistic-ever-learning-polite-and-occasionally-shy,
          damn-hard-working person.
        </p>
      ),
    },
  ],
};

const talks: Section = {
  title: 'Talks & Presentations',
  content: [
    {
      links: [
        {
          label:
            'HYCW: Tus primeros 100 días como Career Changer | Ironhack & Z1 | September, 2021',
          link: 'https://www.meetup.com/es-ES/ironhack-madrid/events/280962161/',
        },
        {
          label:
            'Masterclass UX Engineer, un rol entre el diseño y el front end | Mr. Marcel School |  March, 2021',
          link: 'https://www.youtube.com/watch?v=q97_dvQhlWs',
        },
        {
          label:
            'Best Web Development Project Presentation at Hackshow | Ironhack | January, 2020',
          link: 'https://www.youtube.com/watch?v=RMnrebo_h-c',
        },
      ],
    },
  ],
};

export default [experience, education, skills, talks];
