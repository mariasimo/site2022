import styled, { css } from 'styled-components';
import { BodyLBold, BodyM, BodySBold, HeadingMBold } from '$/styles/typography';
import { from } from '$/styles/responsive';

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
`;

export const Title2 = styled.h2`
  grid-column: 1/7;
  padding-block: 2rem;

  ${from.tabletPortrait} {
    grid-column: 1/3;
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
  margin-block-start: 2rem;
  width: 100%;
  border: none;

  &:after {
    content: '';
    border-top: 1px solid var(--theme-line);
    width: calc(100% - 2.5rem);
    display: flex;
  }
`;

export const ImageContainer = styled.div`
  grid-column: 1/7;
  padding-block: 0 2rem;
  width: 100%;

  ${from.mobile} {
    padding-block: 2rem 4rem;
  }

  ${from.tabletPortrait} {
    padding-inline-end: 3.5rem;
  }
`;

export const Image = styled.img`
  width: 100%;
`;

export const Caption = styled(BodySBold).attrs({ as: 'p' })`
  max-width: 26.25rem;
  margin-block-start: 2rem;
  display: flex;
`;

const ContentStyles = css`
  grid-column: 1/7;

  ${from.tabletPortrait} {
    padding-inline-end: 3.5rem;
    grid-column: 3/7;
  }
`;

export const Text = styled(BodyM).attrs({ as: 'p' })`
  ${ContentStyles}
  font-size: 1.1rem;
  margin-block: 2rem;
`;

export const OrderedList = styled(BodyM).attrs({ as: 'ol' })`
  ${ContentStyles}
  font-size: 1.1rem;
  list-style: none;
  counter-reset: item;
  padding-inline-start: 0;

  li {
    counter-increment: item;
    margin-bottom: 5px;
    display: flex;

    &:before {
      margin-right: 10px;
      content: counter(item);
      display: inline-block;
      opacity: 0.25;
      width: 1.2rem;
      text-align: right;
      flex-shrink: 0;
    }
  }
`;

export const Title3 = styled(HeadingMBold).attrs({ as: 'h3' })`
  ${ContentStyles}
  margin-block: 1rem;
`;

export const Title4 = styled(BodyLBold).attrs({ as: 'h4' })`
  ${ContentStyles}
  margin-block: 1rem 0;
`;
