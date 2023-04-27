import type { ReactNode } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from './constants';

export default function CodeSnippet({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const match = /language-(\w+)/.exec(className || '');

  return (
    <SyntaxHighlighter
      children={String(children).replace(/\n$/, '')}
      language={match?.length ? match[1] : 'javascript'}
      style={nord}
      showLineNumbers
      lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
    />
  );
}
