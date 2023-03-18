import {
  Container,
  Title,
  Summary,
  Meta,
  StatusInfo,
  DateInfo,
  Text,
  Status,
  Cover,
  ScrollButton,
  ScrollButtonContainer,
  Block,
  Bold,
  Paragraph,
  Circle,
  GoHomeBlock,
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

const statusDictionary: { [key: string]: string } = {
  draft: "Draft, I'm still learning about this",
  inProgress: 'In Progress, still making my mind',
  completed: 'Completed, I may changed my mind in the future',
};

export default function NoteHero({
  title,
  summary,
  contentRef,
  published,
  lastUpdated,
  language,
  status: rawStatus,
}: Props) {
  const status = statusDictionary[rawStatus];
  const magnetRef = useRef(null);
  const { x, y } = useMagnetEffect(magnetRef, { strength: 0.7 });
  const controls = useAnimation();

  return (
    <Container>
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
          <Text>Status</Text>
          <Status>
            {status}
            <Tooltip>
              <Paragraph>
                The <Bold>epistemic status</Bold> is the degree of certainty or
                maduration I have about a certain topic. This clarification
                allows me to learning and writing in public more freely and
                transparently, following a honesty policy with the readers of
                this content.
              </Paragraph>
              <Paragraph>
                <Bold>Learn more</Bold>
              </Paragraph>
            </Tooltip>
          </Status>
        </StatusInfo>
        <Block>{language ? <Text>Language: {language}</Text> : null}</Block>
      </Meta>
    </Container>
  );
}
