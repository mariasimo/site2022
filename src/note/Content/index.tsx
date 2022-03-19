import type { ReactNode } from 'react';
import type { Element } from 'hast';
import {
  Blockquote,
  Container,
  Text,
  Title2,
  Image,
  CodeContainer,
  Divider,
  Caption,
  ImageContainer,
  OrderedList,
  Title3,
  Title4,
} from './styles';
import CodeSnippet from '$/note/CodeSnippet';
import { formatSectionTitleId } from '../utils';
import MarkdownParser from '../../common/components/MarkdownParser';

const blogEntryStyledComponents = {
  h2: RenderTitleWithLine,
  h3: Title3,
  h4: Title4,
  p: Text,
  ol: OrderedList,
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

function RenderTitleWithLine({
  node,
  children,
}: {
  node: Element;
  children: ReactNode;
}): JSX.Element {
  const isFirstTitleInArticle =
    node?.position?.start.line === 3 && node?.position.end.line === 3;
  const titleId = formatSectionTitleId(node);

  if (isFirstTitleInArticle) {
    return <Title2 id={titleId}>{children}</Title2>;
  }

  return (
    <>
      <Divider />
      <Title2 id={titleId}>{children}</Title2>
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