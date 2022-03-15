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
} from './styles';
import InfoIcon from '$/assets/icons/info.svg';
import scrollToContent from '$/common/utils/scrollToContent';
import type { Props } from './types';
import { getTimeAgo, parseStringToDate } from '$/common/utils/dates';

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
        <Title>{title}</Title>
        <Summary>{summary}</Summary>
        <ScrollButtonContainer>
          <Text>Scroll to Content</Text>
          <ScrollButton onClick={() => scrollToContent(contentRef)} />
        </ScrollButtonContainer>
      </Cover>
      <Meta>
        <DateInfo>
          <Text>Created {getTimeAgo(parseStringToDate(published))}</Text>{' '}
          {lastUpdated ? (
            <Text>Updated {getTimeAgo(parseStringToDate(lastUpdated))}</Text>
          ) : null}
        </DateInfo>
        <StatusInfo>
          <Text>Status</Text>
          <Status>
            {status} <InfoIcon />
          </Status>
        </StatusInfo>
      </Meta>
    </Container>
  );
}
