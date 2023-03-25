import {
  languagesDictionary,
  NoteCard as NoteCardType,
} from '$/common/utils/notes';
import {
  Container,
  Title,
  Details,
  Header,
  Arrow,
  Language,
  Translations,
} from './styles';
import NextLink from 'next/link';

export default function NoteCard({ note }: { note: NoteCardType }) {
  const { title, comingSoon, tags, slug, translations, language } = note;

  return (
    <Container $disabled={comingSoon ?? false}>
      <NextLink href={slug} locale={language ?? 'en'}>
        <a>
          <Header>
            <Title>{title}</Title>
            <Arrow />
          </Header>
          <Details>
            {comingSoon ? 'Coming Soon' : tags?.join(', ')}{' '}
            {translations?.length ? (
              <Translations role="list">
                {translations?.map((locale) => (
                  <Language key={locale}>
                    {languagesDictionary[locale]}
                  </Language>
                ))}
              </Translations>
            ) : null}
          </Details>
        </a>
      </NextLink>
    </Container>
  );
}
