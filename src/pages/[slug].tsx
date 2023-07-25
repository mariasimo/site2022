import NoteView from '$/note';
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { getNote, getRecommendedLinks, listNotes } from '../common/lib/notes';
import { isLanguage } from '../common/lib/notes/types';

function NotePage({
  note,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return <NoteView note={note} />;
}

export default NotePage;

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const notes = await listNotes();

  return {
    paths: notes.flatMap((note) => {
      const [slug] = note.split('/').filter(Boolean);

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
  const note = getNote(slug, locale);

  if (isLanguage(locale) && note) {
    const otherNotesLinks = await getRecommendedLinks(slug, locale);
    return { props: { note: { ...note, otherNotesLinks } } };
  }

  return { props: {} };
}
