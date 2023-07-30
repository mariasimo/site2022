import {
  getFilePathsFromDirectory,
  getMarkdownContent,
  getTranslationsList,
  getSlugFromFilePath,
  selectRandomItems,
} from '../../utils/getFiles';
import contentConfig from '../../../../content.config';
import { Language, Note, NoteCard, getLanguage } from './types';

export async function listPublicNotes() {
  try {
    const notesList = await getFilePathsFromDirectory(
      contentConfig.notesDirectory,
    );

    return notesList.map((file) => file.replace('.md', ''));
  } catch {
    throw new Error('Error getting the list of notes');
  }
}

export async function getNote(slug: string, locale: Language): Promise<Note> {
  try {
    const translationsList = await getTranslationsList(slug);
    const path =
      translationsList?.length && locale ? `${slug}/${locale}` : slug;

    const {
      data: frontmatter,
      content: rawContent,
      excerpt,
    } = await getMarkdownContent(`${path}.md`);

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
  } catch {
    throw new Error(`Could not read note contents for ${slug}/${locale}`);
  }
}

export async function getNotesCards(): Promise<
  (NoteCard & { date?: string })[]
> {
  const notesList = await listPublicNotes();

  const formatNote = async (fileName: string) => {
    const [slug, locale] = fileName.split('/').filter(Boolean);
    const localeAsEnum = getLanguage(locale);
    const note = await getNote(slug, localeAsEnum);

    return {
      date: note?.lastUpdatedAt ?? note?.publishedAt,
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
  try {
    const fileList = await getFilePathsFromDirectory(
      contentConfig.notesDirectory,
    );

    const recommendedList = selectRandomItems(
      fileList,
      numberOfRecommendations,
    );

    const formatAsMarkdownLink = async (filename: string) => {
      const noteSlug = getSlugFromFilePath(filename);
      const { data } = await getMarkdownContent(filename);
      const isCurrentPost = filename.includes(currentPostSlug);

      const linkFormat =
        typeof data?.title === 'string'
          ? `- [${data.title}](${noteSlug})`
          : null;

      return !isCurrentPost && data.language === locale ? linkFormat : null;
    };

    const linkPromises = Promise.all(recommendedList.map(formatAsMarkdownLink));

    return (await linkPromises).filter(Boolean).join('\n');
  } catch {
    throw new Error(
      `Error retrieving recommended links for ${currentPostSlug}}`,
    );
  }
}

/**
 * Return ms from date string
 * @param dateString dd/mm/yyyy format
 */
function getDateMs(dateString: string) {
  const [day, month, year] = dateString.split('/');
  return new Date(+year, +month - 1, +day).getTime();
}
