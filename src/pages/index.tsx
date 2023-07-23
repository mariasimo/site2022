import HomeView from '$/home';
import type { InferGetStaticPropsType } from 'next';
import content from '../../content.config';

import fs from 'fs';
import matter from 'gray-matter';
import { getNotesCards } from '$/common/lib/notes';

function HomePage({
  notes,
  learningInPublic,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <HomeView
      notes={notes}
      learningInPublic={learningInPublic as { current: string; next: string }}
    />
  );
}

export default HomePage;

export async function getStaticProps({ preview = false }) {
  const readLearningInPublicFile = fs.readFileSync(
    content.learningInPublicFile,
    'utf-8',
  );
  const { data: learningInPublic } = matter(readLearningInPublicFile);
  const notes = await getNotesCards().then((n) => n);

  return {
    props: { preview, notes, learningInPublic },
  };
}
