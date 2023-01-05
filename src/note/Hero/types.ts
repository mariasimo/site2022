import type { MutableRefObject } from 'react';

export type Props = {
  title: string;
  summary: string;
  contentRef: MutableRefObject<HTMLDivElement | null>;
  published: string;
  lastUpdated: string | null;
  status: string;
};
