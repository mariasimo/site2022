import {
  languagesDictionary,
  NoteCard as NoteCardType,
} from '$/common/lib/notes/types';
import { sortAlphabetical } from '../../../common/utils/sort';
import {
  Container,
  Title,
  Details,
  Header,
  Arrow,
  LanguagesList,
} from './styles';
import NextLink from 'next/link';

export default function NoteCard({ note }: { note: NoteCardType }) {
  const { title, tags, slug, translations, language } = note;

  const availableTranslations = sortAlphabetical(
    translations?.map((tr) => {
      return languagesDictionary[tr];
    }) ?? [],
  );

  return (
    <Container>
      <Header>
        <Title>
          <NextLink key={slug} href={slug} locale={language ?? 'en'} passHref>
            <a>{title}</a>
          </NextLink>
        </Title>
        <Arrow />
      </Header>
      <Details>
        {tags?.join(', ')}{' '}
        <LanguagesList>
          {availableTranslations.map((translation) => {
            return (
              <NextLink key={slug} href={slug} locale={language ?? 'en'}>
                {translation}
              </NextLink>
            );
          })}
        </LanguagesList>
      </Details>
    </Container>
  );
}
