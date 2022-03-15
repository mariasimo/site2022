import fs from 'fs';
import matter from 'gray-matter';
import getLatestFilesFromDirectory from './getFiles';
import contentConfig from '../../../content.config';

export type Note = {
  title: string;
  published: string;
  lastUpdated: string;
  status: string;
  slug: string;
  summary: string;
  content: string;
  references: string | null;
  backlinks: string | null;
};

export function getNotesCards() {
  const latestNotesList = getLatestFilesFromDirectory(
    contentConfig.notesDirectory,
    4,
  );

  return latestNotesList.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`content/notes/${fileName}`, 'utf-8');
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      title: frontmatter.title as string,
    };
  });
}

export function listNotes() {
  const notesList = getLatestFilesFromDirectory(contentConfig.notesDirectory);
  return notesList.map((fileName) => fileName.replace('.md', ''));
}

export function getNote(slug: string): Note | undefined {
  const fileName = fs.readFileSync(`content/notes/${slug}.md`, 'utf-8');
  const {
    data: frontmatter,
    content: rawContent,
    excerpt,
  } = matter(fileName, { excerpt: true });
  const content = rawContent.split('\n## References')[0];
  const { references, backlinks } = extractReferencesAndBacklinks(rawContent);

  const note: Note = {
    title: frontmatter.title as string,
    summary: excerpt ?? '',
    published: frontmatter.published as string,
    lastUpdated: frontmatter.lastUpdated as string,
    status: frontmatter.lastUpdated as string,
    slug,
    content,
    references: references ? references : null,
    backlinks: backlinks ? backlinks : null,
  };

  return fileName ? note : undefined;
}

function extractReferencesAndBacklinks(content: string) {
  const references = content
    .split(/## references/i)[1]
    ?.split(/## backlinks/i)[0];
  const backlinks = content.split(/## backlinks/i)[1];

  return { references, backlinks };
}
