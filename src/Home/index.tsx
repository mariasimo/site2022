import { Container } from './styles';
import Arrow from '$/assets/icons/arrow-link.svg';
import Head from 'next/head';

function HomeView(): JSX.Element {
  return (
    <Container>
      <Head>
        <title>María Simó Front—End Developer</title>
      </Head>
      <b>Coming soon</b>
      <p>
        <a href="https://twitter.com/mariasimocodes" target="_blank">
          twitter.com/mariasimocodes <Arrow />
        </a>
        <a href="https://github.com/mariasimo" target="_blank">
          github.com/mariasimo <Arrow />
        </a>
      </p>
    </Container>
  );
}

export default HomeView;
