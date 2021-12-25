import { Container, Badge } from './styles';
import Arrow from '$/assets/icons/arrow-link.svg';
import Head from 'next/head';

import type { IBlogPostFields } from '$/@types/generated/contentful';

function HomeView({ posts }: { posts: IBlogPostFields[] }): JSX.Element {
  return (
    <Container>
      <Head>
        <title>María Simó Front—End Developer</title>
      </Head>
      <Badge>Building in public</Badge>

      <b>Coming soon</b>
      <p>
        <a href="https://twitter.com/mariasimocodes" target="_blank">
          twitter.com/mariasimocodes <Arrow />
        </a>
        <a href="https://github.com/mariasimo" target="_blank">
          github.com/mariasimo <Arrow />
        </a>
      </p>
      <p>{posts.map((p) => p.title)}</p>
    </Container>
  );
}

export default HomeView;
