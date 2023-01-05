import type { MutableRefObject } from 'react';

const scrollToContent = (
  contentRef: MutableRefObject<HTMLDivElement | null>,
) => {
  if (contentRef?.current) {
    contentRef.current.scrollIntoView({ behavior: 'smooth' });
  }
};

export default scrollToContent;
