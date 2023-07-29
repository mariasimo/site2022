import type { MutableRefObject } from 'react';
import type { Note } from '../../common/lib/notes/types';

export type Props = {
  title: string;
  summary: string;
  contentRef: MutableRefObject<HTMLDivElement | null>;
  publishedAt: Date;
  lastUpdatedAt?: Date;
  status: string;
  translations: Note['translations'];
  socialImage: Note['socialImage'];
  metaTitle: Note['metaTitle'];
  metaDescription: Note['metaDescription'];
};
