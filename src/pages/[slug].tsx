import NoteView from '$/note';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import fs from 'fs';
import matter from 'gray-matter';

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

export type Note = {
  title: string;
  published: string;
  lastUpdated: string;
  status: string;
  slug: string;
  summary: string;
  content: string;
  references: string;
  backlinks: string;
};

export function getStaticProps({ params }: GetStaticPropsContext) {
  const slug = params?.slug as string;
  const fileName = fs.readFileSync(`content/notes/${slug}.md`, 'utf-8');
  const { data: frontmatter, content: rawContent } = matter(fileName);
  const content = rawContent.split('\n## References')[0];
  const { references, backlinks } = extractReferencesAndBacklinks(rawContent);

  const note: Note = {
    title: frontmatter.title as string,
    summary: frontmatter.summary as string,
    published: frontmatter.published as string,
    lastUpdated: frontmatter.lastUpdated as string,
    status: frontmatter.lastUpdated as string,
    slug,
    content,
    references,
    backlinks,
  };

  if (fileName) {
    return { props: { note } };
  }

  return { props: {} };
}

function extractReferencesAndBacklinks(content: string) {
  const references = content
    .split(/## references/i)[1]
    .split(/## backlinks/i)[0];
  const backlinks = content.split(/## backlinks/i)[1];

  return { references, backlinks };
}
