import { z } from 'zod';

export const NoteLanguageOptions = z.enum(['en', 'es']);

export type Language = z.infer<typeof NoteLanguageOptions>;

export const languagesDictionary: { [locale in Language]: string } = {
  en: 'English',
  es: 'Spanish',
} as const;

export const NoteMetadataSchema = z
  .object({
    // Could let language from the name of the file
    language: NoteLanguageOptions,
    lastUpdatedAt: z.coerce
      .date()
      .transform((dateString) => dateString.toString())
      .optional(),
    metaDescription: z.string().max(160),
    metaTitle: z.string().max(60),
    publishedAt: z.coerce
      .date()
      .transform((dateString) => dateString.toString()),
    socialImage: z.string().startsWith('/images'),
    status: z.union([
      z.literal('draft'),
      z.literal('inProgress'),
      z.literal('completed'),
    ]),
    tags: z.array(z.string()).nonempty().optional(),
    title: z.string(),
  })
  .strict();

export type Note = z.infer<typeof NoteMetadataSchema> & {
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

export const MarkdownFileSchema = z.object({
  data: NoteMetadataSchema,
  content: z.string(),
  excerpt: z.string(),
  isEmpty: z.boolean(),
});

export type MarkdownFile = z.infer<typeof MarkdownFileSchema>;
