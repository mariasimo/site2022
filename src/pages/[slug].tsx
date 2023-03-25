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
    paths: notes.map((note) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const [slug, locale] = note.split('/').filter(Boolean);

      return {
        params: {
          slug,
        },
        locale,
      };
    }),
    fallback: false,
  };
}

export function getStaticProps({ params, locale }: GetStaticPropsContext) {
  const slug = params?.slug as string;
  const note = getNote(slug, locale);

  if (note) {
    return { props: { note } };
  }

  return { props: {} };
}
