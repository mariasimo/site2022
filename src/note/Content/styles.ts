import styled, { css } from 'styled-components';
import {
  BodyLBold,
  BodyM,
  BodySBold,
  HeadingMBold,
  BodyMBold,
} from '$/styles/typography';
import { from } from '$/styles/responsive';
import type { Width } from '.';

export const Container = styled.article`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  position: relative;
  margin-block-end: 2rem;

  ${from.tabletPortrait} {
    margin-block-end: 5rem;
  }

  section.footnotes {
    position: absolute;
    grid-column: 1/3;
    padding-inline-end: 3.5rem;
    bottom: 0;
    display: none;

    ${from.tabletPortrait} {
      display: block;
    }

    hr {
      display: none;
    }

    ol {
      padding-left: 1rem;

      > li {
        font-family: var(--theme-font-text);
        font-size: 0.75rem;
        line-height: 1.7;
        font-weight: 400;

        &:first-child {
          padding-block-start: 2rem;
        }
        &:not(:last-child) {
          margin-bottom: 1rem;
        }

        .footnote-back {
          margin-inline-start: 0.25rem;
          color: var(--theme-ink);
          display: inline-flex;

          &:hover {
            color: var(--theme-interactive);
          }
        }
      }
    }
  }

  .footnote-ref,
  a:link,
  a:visited,
  a:active {
    color: var(--theme-interactive);
  }
`;

export const Blockquote = styled(BodyM).attrs({ as: 'blockquote' })`
  grid-column: 1/7;
  padding-block: 2rem 4rem;
  margin: 0;

  ${from.mobile} {
    margin: 1rem 2.5rem;
  }

  ${from.tabletPortrait} {
    margin-inline-end: 3.5rem;
    grid-column: 2/7;
  }

  > p {
    padding: 2rem;
    border-left: 2px solid var(--theme-blockquoteLine);
    background-color: var(--theme-blockquoteBg);
    margin-block-end: 0;
  }
`;

export const CodeContainer = styled.div`
  grid-column: 1/7;
  padding-block: 2rem 4rem;
  font-size: 0.85rem;
  width: 100%;

  ${from.tabletPortrait} {
    padding-inline-end: 3.5rem;
  }
`;

export const Divider = styled.hr`
  grid-column: 1/7;
  margin-block: 3rem;
  width: 100%;
  border: none;

  &:after {
    content: '';
    border-top: 1px solid var(--theme-line);
    width: calc(100% - 2.5rem);
    display: flex;
  }
`;

export const Image = styled.img`
  width: 100%;
`;

export const ImageContainer = styled.div<{ $width: Width }>`
  padding-block: 0 2rem;
  width: 100%;

  ${from.mobile} {
    padding-block: 2rem 4rem;
  }

  ${from.tabletPortrait} {
    padding-inline-end: 3.5rem;
  }

  ${({ $width }) => {
    if ($width === 'full') {
      return css`
        grid-column: 1/7;
      `;
    }
    if ($width === 'content') {
      return css`
        grid-column: 3/7;
      `;
    }

    if (typeof $width === 'string' && $width.includes('rem')) {
      return css`
        grid-column: 1/7;

        ${Image} {
          width: ${$width};
        }
      `;
    }
    return css`
      grid-column: 1/7;
    `;
  }}
`;

export const Caption = styled(BodySBold).attrs({ as: 'p' })`
  max-width: 26.25rem;
  margin-block-start: 1rem;
  display: flex;
`;

const ContentStyles = css`
  grid-column: 1/7;

  ${from.tabletPortrait} {
    padding-inline-end: 3.5rem;
    grid-column: 3/7;
  }
`;

export const Title2 = styled(HeadingMBold).attrs({ as: 'h2' })`
  grid-column: 1/7;
  padding-block-end: 2rem;
  scroll-margin-block-start: 2rem;

  ${from.tabletPortrait} {
    grid-column: 1/3;
    margin-inline-end: 2rem;
  }
`;

export const Title3 = styled(BodyLBold).attrs({ as: 'h3' })`
  ${ContentStyles}
  margin-block: 1rem;
`;

export const Title4 = styled(BodyMBold).attrs({ as: 'h4' })`
  ${ContentStyles}
  margin-block: 1rem 1rem;

  ${from.mobile} {
    font-size: 1.25rem;
  }
`;

export const Text = styled(BodyM).attrs({ as: 'p' })`
  ${ContentStyles}
  margin-block-end: 2rem;
`;

export const ListStyles = styled(BodyM)`
  ${ContentStyles}
  list-style: none;
  padding-inline-start: 0;
  margin-block: 0 2rem;
  list-style-position: outside;

  li {
    position: relative;
    margin-block-end: 0.3125rem;
    margin-inline-start: 2rem;

    &:before {
      display: inline-block;
      position: absolute;
      left: -2rem;
      opacity: 0.25;
      text-align: right;
      flex-shrink: 0;
    }
  }
`;

export const OrderedList = styled(ListStyles).attrs({ as: 'ol' })`
  counter-reset: item;

  li {
    counter-increment: item;

    &:before {
      content: counter(item);
    }
  }
`;

export const UnorderedList = styled(ListStyles).attrs({ as: 'ul' })`
  li {
    &:before {
      content: '—';
    }
  }
`;

export const CodeInline = styled.span`
  font-family: 'Fira Code', 'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono',
    monospace;
  color: var(--theme-codeInlineText);
  background-color: var(--theme-codeInlineBg);
  font-weight: 500;
  font-size: 86%;
  padding: 0 0.2rem;
  margin: 0 0.2rem;
  border-radius: 0.25rem;
`;
