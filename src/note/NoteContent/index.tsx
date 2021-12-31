import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Element } from 'hast';
import {
  Blockquote,
  Container,
  Text,
  Title,
  Image,
  CodeContainer,
  Divider,
  Caption,
  ImageContainer,
} from './styles';
import remarkUnwrapImages from 'remark-unwrap-images';
import CodeSnippet from '$/note/CodeSnippet';
import remarkGfm from 'remark-gfm';

const blogEntryStyledComponents = {
  h2: RenderTitleWithLine,
  p: Text,
  blockquote: Blockquote,
  img: RenderImageWithCaption,
  pre: CodeContainer,
  code: CodeSnippet,
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
      remarkPlugins={[remarkUnwrapImages, remarkGfm]}
    />
  );
}

function RenderTitleWithLine({
  node,
  children,
}: {
  node: Element;
  children: ReactNode;
}): JSX.Element {
  const isFirstElement =
    node?.position?.start.line === 1 && node?.position.end.line === 1;

  if (isFirstElement) return <Title>{children}</Title>;

  return (
    <>
      <Divider />
      <Title>{children}</Title>
    </>
  );
}

function RenderImageWithCaption({
  node,
}: {
  node: Element;
}): JSX.Element | null {
  if (!node.properties) return null;
  const { alt = '', src } = node?.properties;

  return (
    <ImageContainer>
      {src ? <Image src={src as string} alt={alt as string} /> : null}
      {alt ? <Caption>{alt} </Caption> : null}
    </ImageContainer>
  );
}
