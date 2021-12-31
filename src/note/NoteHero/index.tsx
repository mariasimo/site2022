import type { MutableRefObject, ReactNode } from 'react';
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

export default function NoteHero({
  title,
  summary,
  contentRef,
}: {
  title: ReactNode;
  summary: ReactNode;
  contentRef: MutableRefObject<HTMLDivElement | null>;
}) {
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
          <Text>Created 2 months ago</Text> <Text>Updated yesterday</Text>
        </DateInfo>
        <StatusInfo>
          <Text>Status</Text>
          <Status>
            Draft, very early stage <InfoIcon />
          </Status>
        </StatusInfo>
      </Meta>
    </Container>
  );
}

function scrollToContent(contentRef: MutableRefObject<HTMLDivElement | null>) {
  if (contentRef?.current) {
    contentRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}
