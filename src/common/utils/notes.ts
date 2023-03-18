import { getLatestFilesFromDirectory, getMarkdownContents } from './getFiles';
import contentConfig from '../../../content.config';

type NoteFrontmatter = {
  title: string;
  published: string;
  lastUpdated: string;
  tags?: string[];
  comingSoon?: boolean;
  status: 'draft' | 'inProgress' | 'completed';
  language: 'Spanish' | 'English';
};

export type Note = NoteFrontmatter & {
  slug: string;
  summary: string;
  content: string;
  references: string | null;
  backlinks: string | null;
};

export type NoteCard = Pick<Note, 'slug' | 'title' | 'comingSoon' | 'tags'>;

export function listNotes() {
  const notesList = getLatestFilesFromDirectory(contentConfig.notesDirectory);

  return notesList
    .map((fileName) => fileName.replace('.md', ''))
    .filter((slug) => {
      const { data: frontmatter } = getMarkdownContents(
        contentConfig.notesDirectory,
        slug,
      );

      return !frontmatter.comingSoon;
    });
}

export function getNote(slug: string): Note | undefined {
  const {
    data,
    content: rawContent,
    excerpt,
  } = getMarkdownContents(contentConfig.notesDirectory, slug);

  // Right now only casting is posible to type frontmatter
  // https://github.com/jonschlinkert/gray-matter/issues/135
  const frontmatter = data as NoteFrontmatter;

  // Get content from excerpt to references links, excluding both
  const content = rawContent.split('---')[1].split('\n## References')[0];

  const { references, backlinks } = extractReferencesAndBacklinks(rawContent);

  const note: Note = {
    title: frontmatter.title,
    summary: excerpt ?? '',
    comingSoon: frontmatter.comingSoon ?? false,
    tags: frontmatter.tags ?? [],
    published: frontmatter.published ?? '',
    lastUpdated: frontmatter?.lastUpdated ?? '',
    status: frontmatter?.status ?? 'draft',
    language: frontmatter?.language ?? null,
    slug,
    content,
    references: references,
    backlinks: backlinks,
  };

  return slug ? note : undefined;
}

export function getNotesCards(): NoteCard[] {
  const latestNotesList = getLatestFilesFromDirectory(
    contentConfig.notesDirectory,
    4,
  );

  return latestNotesList
    .map((fileName) => {
      const slug = fileName.replace('.md', '');
      const note = getNote(slug);

      return {
        title: note?.title ?? '',
        slug: slug,
        tags: note?.tags,
        comingSoon: note?.comingSoon,
      };
    })
    .sort((prev) => (!prev?.comingSoon ? -1 : 1));
}

function extractReferencesAndBacklinks(content: string) {
  const references = content
    .split(/## references/i)[1]
    ?.split(/## backlinks/i)[0];
  const backlinks = content.split(/## backlinks/i)[1];

  return { references, backlinks };
}
