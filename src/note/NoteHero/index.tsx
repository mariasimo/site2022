import type { ReactNode } from 'react';
import {
  Container,
  Title,
  Summary,
  Meta,
  StatusInfo,
  DateInfo,
  Text,
  Status,
} from './styles';
import InfoIcon from '$/assets/icons/info.svg';

export default function NoteHero({
  title,
  summary,
}: {
  title: ReactNode;
  summary: ReactNode;
}) {
  return (
    <Container>
      <Title>{title}</Title>
      <Summary>{summary}</Summary>
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
