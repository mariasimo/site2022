import { z } from 'zod';

const NoteLanguageOptions = z.enum(['en', 'es']);

export type Language = z.infer<typeof NoteLanguageOptions>;

export const languagesDictionary: { [locale in Language]: string } = {
  en: 'English',
  es: 'Spanish',
} as const;

export function isLanguage(locale?: string): locale is Language {
  return NoteLanguageOptions.safeParse(locale).success;
}

const NoteMetaData = z.object({
  hideFromList: z.boolean().optional(),
  language: NoteLanguageOptions,
  lastUpdatedAt: z.string(),
  metaDescription: z.string().max(160),
  metaTitle: z.string().max(60),
  publishedAt: z.string(),
  socialImage: z.string().startsWith('/images'),
  status: z.union([
    z.literal('draft'),
    z.literal('inProgress'),
    z.literal('completed'),
  ]),
  tags: z.array(z.string()).nonempty().optional(),
  title: z.string(),
});

export type NoteFrontmatter = z.infer<typeof NoteMetaData>;

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
  'slug' | 'title' | 'tags' | 'translations' | 'language'
>;
