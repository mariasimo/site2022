import type { AnchorHTMLAttributes, ComponentType, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkGfm from 'remark-gfm';
import type { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react';

const LinkComponent: ComponentType<
  AnchorHTMLAttributes<HTMLAnchorElement> & ReactMarkdownProps
> = ({ node, children, ...props }) => {
  const linkProps = (node.properties?.href as string).includes('http')
    ? { ...props, target: '_blank', rel: "noopener noreferrer'" }
    : { ...props };
  return <a {...linkProps}>{children}</a>;
};

export default function MarkdownParser({
  children,
  components: customComponents,
}: {
  children: string;
  components?: { [tag: string]: ReactNode };
}) {
  const components = {
    a: LinkComponent,
    ...customComponents,
  };

  return (
    <ReactMarkdown
      children={children}
      components={components}
      remarkPlugins={[remarkUnwrapImages, remarkGfm]}
    />
  );
}
