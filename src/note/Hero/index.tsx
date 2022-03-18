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
} from './styles';
import scrollToContent from '$/common/utils/scrollToContent';
import type { Props } from './types';
import { getTimeAgo, parseStringToDate } from '$/common/utils/dates';
import RevealedText from '$/common/components/animation/RevealedText';
import FadeInBlock from '$/common/components/animation/FadeInBlock';
import ArrowLink from '$/common/components/ArrowLink';
import Tooltip from '$/common/components/Tooltip';

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
  status: rawStatus,
}: Props) {
  const status = statusDictionary[rawStatus];

  return (
    <Container>
      <Cover>
        <Title>
          {[{ text: title }]?.map((chunk, index) => (
            <RevealedText content={chunk} key={index} />
          ))}
        </Title>
        <FadeInBlock slideValue={50} delay={0.5}>
          <Summary>{summary}</Summary>
        </FadeInBlock>
        <FadeInBlock slideValue={0} delay={0.75}>
          <ScrollButtonContainer>
            <Text>Scroll to Content</Text>
            <ScrollButton onClick={() => scrollToContent(contentRef)} />
          </ScrollButtonContainer>
        </FadeInBlock>
      </Cover>
      <Meta>
        <Block>
          <ArrowLink label="Go Home" link="/" backlink />
        </Block>
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
      </Meta>
    </Container>
  );
}
