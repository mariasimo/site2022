import styled from 'styled-components';
import { from } from '$/styles/responsive';
import { motion } from 'framer-motion';

export const Row = styled(motion.div)`
  width: 100%;
  display: flex;
  gap: 0 4rem;
  flex-wrap: wrap;
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
