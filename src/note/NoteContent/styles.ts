import styled from 'styled-components';
import { BodyM, BodySBold } from '$/styles/typography';

export const Container = styled.article`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  position: relative;
  margin-block-end: 5rem;

  section.footnotes {
    position: absolute;
    grid-column: 1/3;
    padding-inline-end: 3.5rem;
    bottom: 0;

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

export const Title = styled.h2`
  grid-column: 1/3;
`;

export const Text = styled(BodyM).attrs({ as: 'p' })`
  grid-column: 3/7;

  margin-block-end: 2rem;
  padding-inline-end: 3.5rem;
  font-size: 1.1rem;

  + p {
    margin-block-end: 0;
  }
`;

export const Blockquote = styled(BodyM).attrs({ as: 'blockquote' })`
  grid-column: 2/7;
  padding-block: 4rem;
  margin-inline-end: 3.5rem;

  > p {
    padding: 2rem;
    border-left: 2px solid var(--theme-blockquoteLine);
    background-color: var(--theme-blockquoteBg);
    margin-block-end: 0;
  }
`;

export const CodeContainer = styled.div`
  grid-column: 1/7;
  padding-block: 3.5rem;
  font-size: 0.85rem;
  padding-inline-end: 3.5rem;
  width: 100%;
`;

export const Divider = styled.hr`
  grid-column: 1/7;
  margin-block: 5rem 2.5rem;
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
  padding-inline-end: 3.5rem;
  padding-block: 3.5rem;
  width: 100%;
`;

export const Image = styled.img`
  width: 100%;
`;

export const Caption = styled(BodySBold).attrs({ as: 'p' })`
  max-width: 26.25rem;
  margin-block: 2rem 3.5rem;
  display: flex;
`;
