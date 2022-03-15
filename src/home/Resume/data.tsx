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
          <Bold>Since March 2021 I've been working at Z1</Bold>, a sevillian
          digital product agency. I work with NextJS, TypeScript, Apollo and
          GraphQL crafting beautiful web apps – sometimes in squad and others
          solo—, in a remote and international context. I team up with
          backenders, product people, designers and clients in an agile
          environment.
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
          <Bold>Before that I worked for a year at Secuoyas</Bold>, they gave me
          my first opportunity as a developer. There I learned the ways and
          rituals involved in manufacturing digital products. I worked with
          Gatsby and Framer Motion to create some cool animations and
          interactions for griddo.io.
        </p>
      ),
      links: [
        {
          label: 'griddo.io',
          link: 'https://griddo.io/',
        },
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
          the Full-Time Web Dev Bootcamp. My role there was to provide the
          students with complementary information, guide them through the
          exercises and tasks and, from a more large perspective, through the
          tough and challenging experience that the bootcamp itself is.
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
          Granada. I also took a couple of web dev and graphic design courses. I
          painted for many many years, I was an illustrator for children's books
          and I briefly worked as a concept artist for theme parks, but that was
          a long time ago.
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
