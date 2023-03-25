import NoteView from '$/note';
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { getNote, listNotes } from '../common/utils/notes';

function NotePage({
  note,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return <NoteView note={note} />;
}

export default NotePage;

export function getStaticPaths({ locales }: GetStaticPathsContext) {
  const notes = listNotes();

  return {
    paths: notes.flatMap((note) => {
      return locales?.map((locale) => ({
        params: {
          slug: note,
        },
        locale,
      }));
    }),
    fallback: false,
  };
}

export function getStaticProps({ params }: GetStaticPropsContext) {
  const slug = params?.slug as string;
  const note = getNote(slug);

  if (note) {
    return { props: { note } };
  }

  return { props: {} };
}
