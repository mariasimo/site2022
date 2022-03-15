import type { ReactNode } from 'react';

export type Props = {
  children: ReactNode;
  slideValue?: number;
  from?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  delay?: number;
};

export type SlidePosition = {
  slideValue: number;
  from?: Props['from'];
};
