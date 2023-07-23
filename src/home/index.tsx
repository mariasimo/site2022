import Hero from './Hero';
import Resume from './Resume';
import LatestNotes from './LatestNotes';
import Layout from '$/common/layouts/Main';
import type { NoteCard } from '$/common/lib/notes';

function HomeView({
  notes,
  learningInPublic,
}: {
  notes: NoteCard[];
  learningInPublic: { current: string; next: string };
}): JSX.Element {
  return (
    <Layout title="María Simó Front—End Developer">
      <Hero />
      <LatestNotes notes={notes} learningInPublic={learningInPublic} />
      <Resume />
    </Layout>
  );
}

export default HomeView;
