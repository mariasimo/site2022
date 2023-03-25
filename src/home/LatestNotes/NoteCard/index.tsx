import {
  languagesDictionary,
  NoteCard as NoteCardType,
} from '$/common/utils/notes';
import { Container, Title, Details, Header, Arrow, Language } from './styles';
import NextLink from 'next/link';

export default function NoteCard({ note }: { note: NoteCardType }) {
  const { title, comingSoon, tags, slug, language } = note;

  return (
    <NextLink href={slug} locale={language ?? 'en'}>
      <Container $disabled={comingSoon ?? false}>
        <Header>
          <Title>{title}</Title>
          <Arrow />
        </Header>
        <Details>
          {comingSoon ? 'Coming Soon' : tags?.join(', ')}{' '}
          {!comingSoon ? (
            <Language>{languagesDictionary[language ?? 'en']}</Language>
          ) : null}
        </Details>
      </Container>
    </NextLink>
  );
}
