import NoteView from '$/note';
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { getNote, getRecommendedLinks, listNotes } from '../common/lib/notes';
import { isLanguage } from '../common/lib/notes/types';
import { getTranslationsList } from '../common/utils/getFiles';

function NotePage({
  note,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return <NoteView note={note} />;
}

export default NotePage;

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const notesPaths = await listNotes();
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
  const checkedLocale =
    locale && translations?.includes(locale) ? locale : translations[0];

  const note = await getNote(slug, checkedLocale);

  if (isLanguage(locale) && note) {
    const otherNotesLinks = await getRecommendedLinks(slug, locale);
    return { props: { note: { ...note, otherNotesLinks } } };
  }

  return { props: {} };
}
