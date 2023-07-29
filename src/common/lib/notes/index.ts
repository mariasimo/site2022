import {
  getFilePathsFromDirectory,
  getMarkdownContent,
  getTranslationsList,
  getSlugFromFilePath,
  selectRandomItems,
} from '../../utils/getFiles';
import contentConfig from '../../../../content.config';
import { Language, Note, NoteCard } from './types';

export async function listPublicNotes() {
  const notesList = await getFilePathsFromDirectory(
    contentConfig.notesDirectory,
  );

  return notesList.map((file) => file.replace('.md', ''));
}

export async function getNote(slug: string, locale: string): Promise<Note> {
  const translationsList = (await getTranslationsList(slug)) as Language[];

  const path = translationsList?.length && locale ? `${slug}/${locale}` : slug;

  const {
    data: frontmatter,
    content: rawContent,
    excerpt,
  } = getMarkdownContent(`${path}.md`);

  // Get content from excerpt to references links, excluding both
  const content = rawContent.split('---')[1].split('\n## References')[0];

  const { references, backlinks } = extractReferencesAndBacklinks(rawContent);

  const translations = translationsList.length
    ? translationsList.sort((tr) => (tr === frontmatter?.language ? -1 : 1))
    : [frontmatter?.language ?? 'en'];

  if (frontmatter.socialImage === '') {
    // eslint-disable-next-line no-console
    console.warn(`Missing social image at note ${slug}/${locale}}`);
  }

  return {
    ...frontmatter,
    summary: excerpt,
    backlinks: backlinks ?? null,
    content,
    references,
    slug,
    translations,
  };
}

export async function getNotesCards(): Promise<
  (NoteCard & { date?: string })[]
> {
  const notesList = await listPublicNotes();

  const formatNote = async (fileName: string) => {
    const [slug, locale] = fileName.split('/').filter(Boolean);
    const note = await getNote(slug, locale);

    return {
      date: note?.lastUpdatedAt || note?.publishedAt,
      language: note?.language,
      slug: slug,
      tags: note?.tags,
      title: note?.title ?? '',
      translations: note?.translations ?? [note.language ?? 'en'],
    };
  };

  const sortNotesByMostRecent = (
    a: NoteCard & { date?: string },
    b: NoteCard & { date?: string },
  ) => {
    if (a.date && b.date) {
      return getDateMs(a.date) < getDateMs(b.date) ? 1 : -1;
    }
    if (a.date && !b.date) {
      return -1;
    }
    return 1;
  };

  const removeLanguageDups = (notes: string[]) => {
    return notes.reduce((acc: string[], note: string) => {
      const [slug] = note.replace('.md', '').split('/').filter(Boolean);

      if (!acc.some((n) => n.includes(slug))) {
        return [...acc, note];
      }
      return acc;
    }, []);
  };

  const formattedLatestNotes = removeLanguageDups(notesList).map(formatNote);

  return Promise.all(formattedLatestNotes).then((notes) =>
    notes.sort(sortNotesByMostRecent).slice(0, 4),
  );
}

function extractReferencesAndBacklinks(content: string) {
  const hasReferences = /## references/i.test(content);
  const references = hasReferences
    ? content.split(/## references/i)[1]?.split(/## backlinks/i)[0]
    : '';
  const backlinks = content.split(/## backlinks/i)[1];

  return { references, backlinks };
}

export async function getRecommendedLinks(
  currentPostSlug: string,
  locale: Language = 'es',
  numberOfRecommendations = 3,
): Promise<string> {
  const filterFiles = (filename: string) => {
    const {
      data: { language },
    } = getMarkdownContent(filename);
    const isCurrentPost = filename.includes(currentPostSlug);
    return !isCurrentPost && language === locale;
  };

  const fileList = (
    await getFilePathsFromDirectory(contentConfig.notesDirectory)
  ).filter(filterFiles);

  const recommendedList = selectRandomItems(fileList, numberOfRecommendations);

  function formatAsMarkdownLink(filename: string) {
    const noteSlug = getSlugFromFilePath(filename);
    const { data: noteFrontmatter } = getMarkdownContent(filename);

    return typeof noteFrontmatter?.title === 'string'
      ? `- [${noteFrontmatter.title}](${noteSlug})`
      : null;
  }

  return recommendedList.map(formatAsMarkdownLink).join('\n');
}

/**
 * Return ms from date string
 * @param dateString dd/mm/yyyy format
 */
function getDateMs(dateString: string) {
  const [day, month, year] = dateString.split('/');
  return new Date(+year, +month - 1, +day).getTime();
}
