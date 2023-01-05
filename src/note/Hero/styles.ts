import styled, { keyframes } from 'styled-components';
import { BodyL, BodyXS, BodyXSBold, HeadingLBold } from '$/styles/typography';
import { from } from '$/styles/responsive';
import { motion } from 'framer-motion';

export const Container = styled.section`
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  border-block-end: 1px solid var(--theme-line);
`;

export const Cover = styled.div`
  position: relative;
  margin-block-end: 6rem;
`;

export const ScrollButtonContainer = styled(motion.div)`
  margin-left: auto;
  margin-top: -4rem;
  display: none;
  width: min-content;
  align-items: center;
  cursor: default;

  ${from.tabletPortrait} {
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
`;

export const Summary = styled(BodyL).attrs({ as: 'p' })`
  max-width: 36rem;
`;

export const Meta = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  padding-block: 2.5rem;
  gap: 1rem;

  ${from.tabletPortrait} {
    gap: 0;
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

export const Status = styled(Text)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;
