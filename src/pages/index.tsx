import HomeView from '$/home';
import type { InferGetStaticPropsType } from 'next';
import content from '../../content.config';

import fs from 'fs';
import matter from 'gray-matter';
import { getNotesCards } from '$/common/utils/notes';

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

export function getStaticProps({ preview = false }) {
  const readLearningInPublicFile = fs.readFileSync(
    content.learningInPublicFile,
    'utf-8',
  );
  const { data: learningInPublic } = matter(readLearningInPublicFile);
  const notes = getNotesCards();

  return {
    props: { preview, notes, learningInPublic },
  };
}
