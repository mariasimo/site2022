import ArrowLink from '$/common/components/ArrowLink';
import { List } from './styles';
import type { Element } from 'hast';
import MarkdownParser from '$/common/components/MarkdownParser';

const linkComponent = {
  a: RenderArrowLink,
  ul: List,
};

export default function NoteLinks({ children }: { children: string }) {
  return <MarkdownParser children={children} components={linkComponent} />;
}

function RenderArrowLink({
  node,
  children,
}: {
  node: Element;
  children: string[];
}): JSX.Element {
  const href = node?.properties?.href as string;

  return (
    <ArrowLink
      label={children[0]}
      link={href ?? ''}
      target={href.includes('http') ? '_blank' : '_self'}
    />
  );
}
