import type { NoteCard as NoteCardType } from '$/common/utils/notes';
import { Container, Title, Details, Header, Arrow } from './styles';
import NextLink from 'next/link';

export default function NoteCard({ note }: { note: NoteCardType }) {
  const { title, comingSoon, tags, slug } = note;

  return (
    <NextLink href={slug}>
      <Container $disabled={comingSoon ?? false}>
        <Header>
          <Title>{title}</Title>
          <Arrow />
        </Header>
        <Details>{comingSoon ? 'Coming Soon' : tags?.join(', ')}</Details>
      </Container>
    </NextLink>
  );
}
