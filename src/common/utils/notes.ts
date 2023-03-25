import {
  getFilesFromDirectory,
  getMarkdownContents,
  getTranslationsList,
} from './getFiles';
import contentConfig from '../../../content.config';

export const languagesDictionary = {
  en: 'English',
  es: 'Spanish',
} as const;

export type Language = keyof typeof languagesDictionary;

type NoteFrontmatter = {
  title: string;
  published: string;
  lastUpdated: string;
  tags?: string[];
  comingSoon?: boolean;
  hideFromList?: boolean;
  status: 'draft' | 'inProgress' | 'completed';
  language?: Language | null;
  socialImage?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
};

export type Note = NoteFrontmatter & {
  slug: string;
  summary: string;
  content: string;
  references: string | null;
  backlinks: string | null;
  translations: Language[] | null;
};

export type NoteCard = Pick<
  Note,
  'slug' | 'title' | 'comingSoon' | 'tags' | 'translations' | 'language'
>;

export function listNotes() {
  const notesList = getFilesFromDirectory(contentConfig.notesDirectory);

  return notesList
    .map((fileName) => fileName.replace('.md', ''))
    .filter((path) => {
      const { data: frontmatter } = getMarkdownContents(path);

      return !frontmatter.comingSoon;
    });
}

export function getNote(slug: string, locale?: string): Note | undefined {
  const translations = getTranslationsList(slug) as Language[];

  const path = translations?.length && locale ? `${slug}/${locale}` : slug;
  const { data, content: rawContent, excerpt } = getMarkdownContents(path);

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
    hideFromList: frontmatter.hideFromList ?? false,
    tags: frontmatter.tags ?? [],
    published: frontmatter.published ?? '',
    lastUpdated: frontmatter?.lastUpdated ?? '',
    status: frontmatter?.status ?? 'draft',
    translations: translations ?? [frontmatter?.language],
    language: frontmatter.language ?? 'en',
    socialImage: frontmatter?.socialImage ?? null,
    metaTitle: frontmatter?.metaTitle ?? frontmatter.title,
    metaDescription: frontmatter?.metaDescription ?? null,
    slug,
    content,
    references: references,
    backlinks: backlinks ?? null,
  };

  return slug ? note : undefined;
}

export function getNotesCards(): NoteCard[] {
  const latestNotesList = getFilesFromDirectory(contentConfig.notesDirectory)
    .map((fileName) => fileName.replace('.md', ''))
    .filter((path) => {
      const { data: frontmatter } = getMarkdownContents(path);

      return !frontmatter.hideFromList;
    });

  return latestNotesList
    .slice(0, 4)
    .map((fileName) => {
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
        translations: note?.translations ?? [],
        language: note?.language,
        date: !note?.comingSoon && (note?.lastUpdated || note?.published),
      };
    })
    .sort((a, b) => {
      if (a.date && b.date) {
        return getDateMs(a.date) < getDateMs(b.date) ? 1 : -1;
      }
      if (a.date && !b.date) {
        return -1;
      }
      return 1;
    });
}

function extractReferencesAndBacklinks(content: string) {
  const references = content
    .split(/## references/i)[1]
    ?.split(/## backlinks/i)[0];
  const backlinks = content.split(/## backlinks/i)[1];

  return { references, backlinks };
}

/**
 * Return ms from date string
 * @param dateString dd/mm/yyyy format
 */
function getDateMs(dateString: string) {
  const [day, month, year] = dateString.split('/');
  return new Date(+year, +month - 1, +day).getTime();
}
