export const languagesDictionary = {
  en: 'English',
  es: 'Spanish',
} as const;

export type Language = keyof typeof languagesDictionary;

export function isLanguage(locale?: string): locale is Language {
  if (!locale) return false;
  return Object.keys(languagesDictionary).includes(locale);
}

export type NoteFrontmatter = {
  title: string;
  published: string;
  lastUpdated: string;
  tags?: string[];
  comingSoon?: boolean;
  hideFromList?: boolean;
  status: 'draft' | 'inProgress' | 'completed';
  language: Language | null;
  socialImage?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  kudosCount?: number;
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
