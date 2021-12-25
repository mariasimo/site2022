import { Container, Badge } from './styles';
import {
  BodyL,
  BodyLBold,
  BodyM,
  BodyMBold,
  BodyS,
  BodySBold,
  BodyXS,
  BodyXSBold,
  HeadingL,
  HeadingLBold,
  HeadingM,
  HeadingMBold,
} from '$/styles/typography';
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

      <br />
      <br />
      <p>Text Styles</p>

      <HeadingL as="p">HeadingL — Lorem ipsum dolor sit amet</HeadingL>
      <HeadingLBold as="p">
        HeadingLBold — Lorem ipsum dolor sit amet
      </HeadingLBold>
      <HeadingM as="p">HeadingM — Lorem ipsum dolor sit amet</HeadingM>
      <HeadingMBold as="p">
        HeadingMBold — Lorem ipsum dolor sit amet
      </HeadingMBold>
      <BodyL as="p">
        BodyL — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Praesent ipsum erat, facilisis in nunc et, tempor commodo elit. Aliquam
        in tempus ipsum, et ornare est. In sit amet tellus sed mauris porta
        tempus.
      </BodyL>
      <BodyLBold as="p">
        BodyLBold — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Praesent ipsum erat, facilisis in nunc et, tempor commodo elit. Aliquam
        in tempus ipsum, et ornare est. In sit amet tellus sed mauris porta
        tempus.
      </BodyLBold>
      <BodyM as="p">
        BodyM — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Praesent ipsum erat, facilisis in nunc et, tempor commodo elit. Aliquam
        in tempus ipsum, et ornare est. In sit amet tellus sed mauris porta
        tempus.
      </BodyM>
      <BodyMBold as="p">
        BodyMBold — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Praesent ipsum erat, facilisis in nunc et, tempor commodo elit. Aliquam
        in tempus ipsum, et ornare est. In sit amet tellus sed mauris porta
        tempus.
      </BodyMBold>
      <BodyS as="p">
        BodyS — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Praesent ipsum erat, facilisis in nunc et, tempor commodo elit. Aliquam
        in tempus ipsum, et ornare est. In sit amet tellus sed mauris porta
        tempus.
      </BodyS>
      <BodySBold as="p">
        BodySBold — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Praesent ipsum erat, facilisis in nunc et, tempor commodo elit. Aliquam
        in tempus ipsum, et ornare est. In sit amet tellus sed mauris porta
        tempus.
      </BodySBold>
      <BodyXS as="p">
        BodyXS — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Praesent ipsum erat, facilisis in nunc et, tempor commodo elit. Aliquam
        in tempus ipsum, et ornare est. In sit amet tellus sed mauris porta
        tempus.
      </BodyXS>
      <BodyXSBold as="p">
        BodyXSBold — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Praesent ipsum erat, facilisis in nunc et, tempor commodo elit. Aliquam
        in tempus ipsum, et ornare est. In sit amet tellus sed mauris porta
        tempus.
      </BodyXSBold>
    </Container>
  );
}

export default HomeView;
