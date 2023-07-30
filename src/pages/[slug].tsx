import NoteView from '$/note';
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import {
  getNote,
  getRecommendedLinks,
  listPublicNotes,
} from '../common/lib/notes';
import { getTranslationsList } from '../common/utils/getFiles';
import { NoteLanguageOptions } from '../common/lib/notes/types';

function NotePage({
  note,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return <NoteView note={note} />;
}

export default NotePage;

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const notesPaths = await listPublicNotes();
  const notes = [
    ...new Set(
      notesPaths.map((path) => {
        const [slug, locale] = path.split('/').filter(Boolean);
        return { slug, locale };
      }),
    ),
  ];

  return {
    paths: notes.flatMap(({ slug }) => {
      return locales?.map((locale) => {
        return {
          params: {
            slug,
          },
          locale,
        };
      });
    }),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
  locale,
}: GetStaticPropsContext) {
  const slug = params?.slug as string;
  const translations = await getTranslationsList(slug);
  const localeAsEnum = NoteLanguageOptions.parse(locale);

  // If there's a translation for this locale, use it, other wise, use the first translation available
  const checkedLocale = translations?.includes(localeAsEnum)
    ? localeAsEnum
    : translations[0];

  const note = await getNote(slug, checkedLocale);

  if (note) {
    const otherNotesLinks = await getRecommendedLinks(slug, localeAsEnum);
    return { props: { note: { ...note, otherNotesLinks } } };
  }

  return { props: {} };
}
