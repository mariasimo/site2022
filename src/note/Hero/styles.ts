import styled, { css } from 'styled-components';
import { BodyL, BodyXS, BodyXSBold, HeadingLBold } from '$/styles/typography';
import { from } from '$/styles/responsive';
import { motion } from 'framer-motion';

export const Container = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  border-block-end: 1px solid var(--theme-line);
  padding-block-start: 3rem;
`;

export const Cover = styled.div`
  position: relative;

  ${from.mobile} {
    margin-block-end: 3rem;
  }

  ${from.tabletLandscape} {
    margin-block-end: 6rem;
  }

  ${from.desktop} {
    margin-block-end: 10rem;
  }
`;

export const ScrollButtonContainer = styled(motion.div)`
  margin-left: auto;
  margin-top: -4rem;
  display: none;
  width: min-content;
  align-items: center;
  cursor: default;

  ${from.tabletLandscape} {
    display: flex;
  }
`;

export const ScrollButton = styled(motion.button)`
  border: 1px solid var(--theme-line);
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-inline-start: 1rem;
  background-color: transparent;
`;

export const Circle = styled(motion.span)`
  border-radius: 50%;
  width: 0.5rem;
  height: 0.5rem;
  background-color: var(--theme-ink);
  display: flex;
`;

export const Title = styled(HeadingLBold).attrs({ as: 'h1' })`
  margin-block-end: 3rem;
  max-width: 36rem;

  ${from.desktop} {
    max-width: 42rem;
  }
`;

export const Summary = styled(BodyL).attrs({ as: 'p' })`
  max-width: 36rem;

  ${from.desktop} {
    max-width: 42rem;
  }
`;

export const Meta = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  padding-block: 2.5rem;
  gap: 0.25rem;

  ${from.mobile} {
    gap: 1rem;
  }

  ${from.tabletPortrait} {
    grid-template-columns: repeat(6, 1fr);
  }

  ${from.tabletLandscape} {
    grid-template-columns: repeat(8, 1fr);
  }
`;

export const Block = styled(BodyXS).attrs({ as: 'div' })`
  grid-column: span 8;

  ${from.tabletPortrait} {
    grid-column: span 2;
  }
`;

export const GoHomeBlock = styled(Block)`
  grid-column: span 8;
  margin-block-end: 0.75rem;

  ${from.mobile} {
    margin-block-end: 0;
  }

  ${from.tabletLandscape} {
    grid-column: span 2;
    margin-block-end: 0;
  }
`;

export const DateInfo = styled(Block)``;
export const StatusInfo = styled(Block)`
  fill: var(--theme-ink);
`;

export const Text = styled(BodyXS).attrs({ as: 'p' })`
  white-space: nowrap;
`;

export const Paragraph = styled(BodyXS).attrs({ as: 'p' })`
  &:not(& + p) {
    margin-bottom: 1rem;
  }
`;
export const Bold = styled(BodyXSBold).attrs({ as: 'span' })``;

export const LearnMoreLink = styled(Bold).attrs({ as: 'a' })``;

export const Status = styled(Text)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  white-space: wrap;
`;

export const StatusText = styled(Text)`
  white-space: pre-wrap;
`;

export const Translations = styled.ul`
  display: inline;
  margin: 0;
  padding: 0;
`;

export const Language = styled.li<{ $isActive?: boolean }>`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: inline;

  &:not(:last-child):after {
    content: ', ';
  }

  ${({ $isActive }) => {
    if ($isActive) {
      return css`
        a {
          font-weight: 500;
        }
      `;
    } else {
      return css`
        a:link,
        a:visited,
        a:active {
          color: var(--theme-interactive);
        }
      `;
    }
  }}
`;
