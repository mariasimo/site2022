import {
  getFilePathsFromDirectory,
  getRandomFilesFromDirectory,
  getMarkdownContents,
  getTranslationsList,
  getSlugFromFilePath,
} from '../../utils/getFiles';
import contentConfig from '../../../../content.config';
import { NoteFrontmatter, Language, Note, NoteCard } from './types';

export async function listNotes() {
  const notesList = await getFilePathsFromDirectory(
    contentConfig.notesDirectory,
  );

  return notesList
    .filter((path) => {
      const { data: frontmatter } = getMarkdownContents(path);
      return !frontmatter.comingSoon;
    })
    .map((file) => file.replace('.md', ''));
}

export function getNote(slug: string, locale?: string): Note {
  const translationsList = getTranslationsList(slug) as Language[];

  const path = translationsList?.length && locale ? `${slug}/${locale}` : slug;
  const {
    data,
    content: rawContent,
    excerpt,
  } = getMarkdownContents(`${path}.md`);

  // Right now only casting is posible to type frontmatter
  // https://github.com/jonschlinkert/gray-matter/issues/135
  const frontmatter = data as NoteFrontmatter;

  // Get content from excerpt to references links, excluding both
  const content = rawContent.split('---')[1].split('\n## References')[0];

  const { references, backlinks } = extractReferencesAndBacklinks(rawContent);

  const translations = translationsList.length
    ? translationsList.sort((tr) => (tr === frontmatter?.language ? -1 : 1))
    : [frontmatter?.language ?? 'en'];

  const note: Note = {
    title: frontmatter.title,
    summary: excerpt ?? '',
    comingSoon: frontmatter.comingSoon ?? false,
    hideFromList: frontmatter.hideFromList ?? false,
    tags: frontmatter.tags ?? [],
    published: frontmatter.published ?? '',
    lastUpdated: frontmatter?.lastUpdated ?? '',
    status: frontmatter?.status ?? 'draft',
    translations,
    language: frontmatter.language ?? 'en',
    socialImage: frontmatter?.socialImage ?? null,
    metaTitle: frontmatter?.metaTitle ?? frontmatter.title,
    metaDescription: frontmatter?.metaDescription ?? null,
    slug,
    content,
    references: references,
    backlinks: backlinks ?? null,
  };

  return note;
}

export async function getNotesCards(): Promise<NoteCard[]> {
  const notesList = await getFilePathsFromDirectory(
    contentConfig.notesDirectory,
  ).then((f) =>
    f.filter((path) => {
      const { data: frontmatter } = getMarkdownContents(path);

      return !frontmatter.hideFromList;
    }),
  );

  const formatNotes = (fileName: string) => {
    const [slug, locale] = fileName
      .replace('.md', '')
      .split('/')
      .filter(Boolean);

    const note = getNote(slug, locale);

    return {
      title: note?.title ?? '',
      slug: slug,
      tags: note?.tags,
      comingSoon: note?.comingSoon,
      hideFromList: note?.hideFromList,
      translations: note?.translations ?? [note.language ?? 'en'],
      language: note?.language,
      date: !note?.comingSoon && (note?.lastUpdated || note?.published),
    };
  };

  const sortNotes = (
    a: ReturnType<typeof formatNotes>,
    b: ReturnType<typeof formatNotes>,
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

  const formattedLatestNotes = removeLanguageDups(notesList)
    .slice(0, 4)
    .map(formatNotes)
    .sort(sortNotes);

  return formattedLatestNotes;
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
): Promise<string> {
  const filterCondition = (filename: string) => {
    const filePath = filename.includes('.md') ? filename : `${filename}/en.md`;
    const { data: noteFrontmatter } = getMarkdownContents(filePath);
    return !noteFrontmatter.hideFromList && !filename.includes(currentPostSlug);
  };

  const recommendedLinks = await getRandomFilesFromDirectory(
    contentConfig.notesDirectory,
    3,
    filterCondition,
  );

  return recommendedLinks
    .map((fileName) => {
      const noteSlug = getSlugFromFilePath(fileName);
      const { data: noteFrontmatter } = getMarkdownContents(fileName);

      return { noteFrontmatter, noteSlug };
    })
    .filter(({ noteFrontmatter }) => {
      return !noteFrontmatter.hideFromList;
    })
    .map(({ noteFrontmatter, noteSlug }) => {
      return typeof noteFrontmatter?.title === 'string'
        ? `- [${noteFrontmatter.title}](${noteSlug})`
        : null;
    })
    .join('\n');
}

/**
 * Return ms from date string
 * @param dateString dd/mm/yyyy format
 */
function getDateMs(dateString: string) {
  const [day, month, year] = dateString.split('/');
  return new Date(+year, +month - 1, +day).getTime();
}
