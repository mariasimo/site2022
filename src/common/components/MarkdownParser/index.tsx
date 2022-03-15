import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkGfm from 'remark-gfm';

export default function MarkdownParser({
  children,
  components,
}: {
  children: string;
  components?: { [tag: string]: ReactNode };
}) {
  return (
    <ReactMarkdown
      children={children}
      components={components}
      remarkPlugins={[remarkUnwrapImages, remarkGfm]}
    />
  );
}
