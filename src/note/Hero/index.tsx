import {
  Container,
  Title,
  Summary,
  Meta,
  StatusInfo,
  DateInfo,
  Text,
  Status,
  StatusText,
  Cover,
  ScrollButton,
  ScrollButtonContainer,
  Block,
  Bold,
  Paragraph,
  Circle,
  GoHomeBlock,
  LearnMoreLink,
  Translations,
  Language,
} from './styles';
import scrollToContent from '$/common/utils/scrollToContent';
import type { Props } from './types';
import { getTimeAgo, parseStringToDate } from '$/common/utils/dates';
import RevealedText from '$/common/components/animation/RevealedText';
import FadeInBlock from '$/common/components/animation/FadeInBlock';
import ArrowLink from '$/common/components/ArrowLink';
import Tooltip from '$/common/components/Tooltip';
import { useRef } from 'react';
import { useMagnetEffect } from '$/common/hooks/useMagnetEffect';
import { useAnimation } from 'framer-motion';
import MarkdownParser from '../../common/components/MarkdownParser';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { languagesDictionary } from '../../common/lib/notes';
import NextLink from 'next/link';

const statusDictionary: { [key: string]: string } = {
  draft: "Draft, I'm still learning about this",
  inProgress: 'In Progress, still making my mind',
  completed: 'Completed, I could change my mind later',
};

export default function NoteHero({
  title,
  summary,
  contentRef,
  published,
  lastUpdated,
  translations,
  status: rawStatus,
  socialImage,
  metaTitle,
  metaDescription,
}: Props) {
  const status = statusDictionary[rawStatus];
  const magnetRef = useRef(null);
  const { x, y } = useMagnetEffect(magnetRef, { strength: 0.7 });
  const controls = useAnimation();
  const { asPath, query, locale } = useRouter();

  const slug = typeof query.slug === 'string' ? query.slug : undefined;

  return (
    <Container>
      <Head>
        <title>{metaTitle}</title>
        {metaDescription ? (
          <meta property="description" content={metaDescription} />
        ) : null}
        <meta property="og:url" content={`origin${asPath}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta name="og:site_name" content="Maria Simo Codes" />
        {metaDescription ? (
          <meta property="og:description" content={metaDescription} />
        ) : null}
        {socialImage ? (
          <meta
            property="og:image"
            content={`https://www.mariasimo.codes${socialImage}`}
          />
        ) : null}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="mariasimo.codes" />
        <meta property="twitter:url" content={`origin${asPath}`} />
        <meta name="twitter:title" content={title} />
        {metaDescription ? (
          <meta property="twitter:description" content={metaDescription} />
        ) : null}
        {socialImage ? (
          <meta
            name="twitter:image"
            content={`https://www.mariasimo.codes${socialImage}`}
          />
        ) : null}
      </Head>
      <Cover>
        <Title>
          {[{ text: title }]?.map((chunk, index) => (
            <RevealedText content={chunk} key={index} />
          ))}
        </Title>
        <FadeInBlock slideValue={50} delay={0.5}>
          <Summary>
            <MarkdownParser children={summary} />
          </Summary>
        </FadeInBlock>
        <FadeInBlock slideValue={0} delay={0.75}>
          <ScrollButtonContainer
            ref={magnetRef}
            style={{ x: x / 10, y: y / 10 }}
          >
            <Text>Scroll to Content</Text>
            <ScrollButton
              onClick={() => scrollToContent(contentRef)}
              style={{ x: x / 2, y: y / 2 }}
              onHoverStart={() => {
                void controls.start({
                  y: [-10, 10],
                  opacity: [1, 1, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 1,
                    ease: 'backOut',
                  },
                });
              }}
              onHoverEnd={() => {
                controls.set({ y: 0, opacity: 1 });
                return controls.stop();
              }}
            >
              <Circle initial={{ y: 0, opacity: 1 }} animate={controls} />
            </ScrollButton>
          </ScrollButtonContainer>
        </FadeInBlock>
      </Cover>
      <Meta>
        <GoHomeBlock>
          <ArrowLink label="Go Home" link="/" backlink />
        </GoHomeBlock>
        <DateInfo>
          <Text>Created {getTimeAgo(parseStringToDate(published))}</Text>{' '}
          {lastUpdated ? (
            <Text>Updated {getTimeAgo(parseStringToDate(lastUpdated))}</Text>
          ) : null}
        </DateInfo>
        <StatusInfo>
          <Status>
            Status{' '}
            <Tooltip>
              <Paragraph>
                The <Bold>epistemic status</Bold> is the degree of certainty or
                maduration I have about a certain topic. This clarification
                allows me to learning and writing in public more freely and
                transparently, following a honesty policy with the readers of
                this content.
              </Paragraph>
              <Paragraph>
                <LearnMoreLink
                  as="a"
                  href="https://v5.chriskrycho.com/journal/epistemic-status/"
                  target="_blank"
                >
                  Learn more
                </LearnMoreLink>
              </Paragraph>
            </Tooltip>
          </Status>
          <StatusText>{status}</StatusText>
        </StatusInfo>
        <Block>
          {' '}
          {translations && translations?.length > 1 && slug ? (
            <Translations role="list">
              {translations?.map((translation) => (
                <Language key={translation} $isActive={locale === translation}>
                  <NextLink href={`/${slug}`} locale={translation}>
                    {languagesDictionary[translation]}
                  </NextLink>
                </Language>
              ))}
            </Translations>
          ) : (
            <Language key={translations?.[0]}>
              {languagesDictionary[translations?.[0] ?? 'en']}
            </Language>
          )}
        </Block>
      </Meta>
    </Container>
  );
}
