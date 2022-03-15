import formatKebabCase from '../common/utils/formatKebabCase';
import type { Element, Literal } from 'hast';

export const formatSectionTitleId = (node: Element) => {
  const titleText = (node.children[0] as Literal).value;
  return formatKebabCase(`${titleText}`);
};
