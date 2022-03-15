import type { MutableRefObject, ReactNode } from 'react';

export type Props = {
  title: ReactNode;
  summary: ReactNode;
  contentRef: MutableRefObject<HTMLDivElement | null>;
  published: string;
  lastUpdated?: string;
  status: string;
};
