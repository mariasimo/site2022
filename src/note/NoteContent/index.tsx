import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Blockquote,
  Container,
  Text,
  Title,
  Image,
  CodeContainer,
} from './styles';
import remarkUnwrapImages from 'remark-unwrap-images';
import CodeSnippet from '../CodeSnippet';

const blogEntryStyledComponents = {
  hr: () => null,
  h2: Title,
  p: Text,
  blockquote: Blockquote,
  img: Image,
  pre: CodeContainer,
  code: ({
    children,
    className,
  }: {
    children: ReactNode;
    className: string;
  }) => <CodeSnippet children={children} className={className} />,
};

export default function NoteContent({ children }: { children: string }) {
  return (
    <Container>
      <MarkdownParser
        children={children}
        components={blogEntryStyledComponents}
      />
    </Container>
  );
}

function MarkdownParser({
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
      remarkPlugins={[remarkUnwrapImages]}
    />
  );
}
