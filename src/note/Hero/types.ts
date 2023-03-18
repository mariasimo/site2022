import type { MutableRefObject } from 'react';
import type { Note } from '../../common/utils/notes';

export type Props = {
  title: string;
  summary: string;
  contentRef: MutableRefObject<HTMLDivElement | null>;
  published: string;
  lastUpdated: string | null;
  status: string;
  language: Note['language'];
  socialImage: Note['socialImage'];
};
