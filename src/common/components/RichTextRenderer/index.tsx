import { Document, BLOCKS, MARKS } from '@contentful/rich-text-types';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import type { ComponentType, ReactNode } from 'react';

type MarksAndBlocks = MARKS | BLOCKS;

export default function RichTextRenderer({
  document,
  options: defaultOptions,
}: {
  document?: Document;
  options?: {
    [style in MarksAndBlocks]?: ComponentType;
  };
}) {
  if (!document) return null;
  const options = defaultOptions ? getOptions(defaultOptions) : undefined;
  return <>{documentToReactComponents(document, options)}</>;
}

function getOptions(options: { [style: string]: ComponentType }): Options {
  const t = Object.keys(options).reduce(
    (object, cu) => {
      if (Object.keys(MARKS).includes(cu.toUpperCase()) && object.renderMark) {
        object.renderMark[cu as MarksAndBlocks] = (text: ReactNode) => {
          const Style = options[cu];
          return <Style>{text}</Style>;
        };
      }
      if (Object.keys(MARKS).includes(cu.toUpperCase()) && object.renderNode) {
        object.renderNode[cu as MarksAndBlocks] = (text: ReactNode) => {
          const Style = options[cu];
          return <Style>{text}</Style>;
        };
      }

      return object;
    },
    {
      renderMark: {},
      renderNode: {},
      renderText: (text: ReactNode) => text,
    } as Options,
  );

  return t;
}
