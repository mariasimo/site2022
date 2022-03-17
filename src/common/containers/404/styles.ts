import styled from 'styled-components';
import { BodyL } from '$/styles/typography';
import { from } from '$/styles/responsive';
import { motion } from 'framer-motion';

export const Container = styled.div`
  line-height: 1.5;
  box-sizing: content-box;
  width: 100%;
  max-width: 75rem;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 0;
  height: calc(100vh - 1.5rem);
  overflow: hidden;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 87vh;

  ${from.mobile} {
    height: 84vh;
  }

  ${from.tabletPortrait} {
    height: 87vh;
  }
`;

export const Row = styled(motion.div)`
  width: 100%;
  display: flex;
  gap: 0 4rem;
  flex-wrap: wrap;
`;

export const Box = styled.div<{ $marginBottom?: string }>`
  margin-block-end: ${({ $marginBottom }) => $marginBottom ?? '0'};
  display: flex;
  flex-direction: column;
`;

export const BoxWithDetails = styled(Box)`
  flex-direction: row;
  gap: 4rem;
`;

export const Details = styled(BodyL)`
  display: flex;
  font-size: 1.15rem;
  flex-direction: column;
  justify-content: flex-end;
  padding-block: 0.5rem;

  ${from.tabletPortrait} {
    flex-direction: row;
    align-items: flex-end;
    gap: 3rem;
    font-size: 1.5rem;
  }
`;

export const WordMask = styled.span`
  clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
  display: grid;
  height: 7ch;

  ${from.tabletPortrait} {
    height: 10ch;
  }
`;

export const Word = styled(motion.p)`
  display: inline-block;
  white-space: pre-wrap;

  font-weight: 500;
  line-height: 0.9;
  font-size: 4.2rem;

  ${from.tabletPortrait} {
    font-size: clamp(4rem, 12vw, 6rem);
    white-space: nowrap;
  }

  ${from.tabletLandscape} {
    font-size: 7.125rem;
  }
`;

export const Trigger = styled.div`
  position: absolute;
  bottom: -1px;
  height: 1px;
  width: 1px;
  visibility: hidden;
`;
