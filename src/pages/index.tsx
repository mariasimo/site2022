import HomeView from '$/home';
import type { InferGetStaticPropsType } from 'next';

import fs from 'fs';
import matter from 'gray-matter';

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
  const notesDirectory = 'content/notes/';
  const learningInPublicFile = 'content/learning-in-public.md';

  const readLearningInPublicFile = fs.readFileSync(
    learningInPublicFile,
    'utf-8',
  );
  const { data: learningInPublic } = matter(readLearningInPublicFile);

  const latestNotesList = getLatestFilesFromDirectory(notesDirectory, 4);
  const notes = parseNotes(latestNotesList);

  return {
    props: { preview, notes, learningInPublic },
  };
}

function getLatestFilesFromDirectory(dir: string, num: number) {
  const files = fs.readdirSync(dir).sort(function (a, b) {
    return (
      fs.statSync(dir + b).mtime.getTime() -
      fs.statSync(dir + a).mtime.getTime()
    );
  });

  return files.slice(0, num);
}

function parseNotes(notesList: string[]) {
  return notesList.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`content/notes/${fileName}`, 'utf-8');
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      title: frontmatter.title as string,
    };
  });
}
