import type { MutableRefObject } from 'react';
import type { Note } from '../../common/lib/notes/types';

export type Props = {
  contentRef: MutableRefObject<HTMLDivElement | null>;
  lastUpdatedAt?: Date;
  metaDescription: Note['metaDescription'];
  metaTitle: Note['metaTitle'];
  publishedAt: Date;
  socialImage: Note['socialImage'];
  status: Note['status'];
  summary: Note['summary'];
  title: Note['title'];
  translations: Note['translations'];
};
