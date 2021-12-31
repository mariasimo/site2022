import NoteView from '$/note';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { getPostBySlug } from '$/lib/api/posts';

function NotePage({
  note,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return <NoteView note={note} />;
}

export default NotePage;

export function getStaticPaths() {
  return {
    paths: [{ params: { slug: '/authn-authz-the-good-the-bad-and-the-ugly' } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const note = (await getPostBySlug(false, params?.slug as string)) ?? [];

  if (note) {
    return { props: { note } };
  }

  return { props: {} };
}
