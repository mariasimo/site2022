import NoteView from '$/note';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { getNote, listNotes } from '../common/utils/notes';

function NotePage({
  note,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return <NoteView note={note} />;
}

export default NotePage;

export function getStaticPaths() {
  const notes = listNotes();

  return {
    paths: notes.map((note) => ({
      params: {
        slug: note,
      },
    })),
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
