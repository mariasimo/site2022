import { motion } from 'framer-motion';
import styled from 'styled-components';
import { prettyScrollbar } from '$/styles/mixins';

export const Container = styled.span`
  position: relative;
  line-height: 0;
`;

export const Box = styled(motion.span)<{
  $xCoord: number;
  $yCoord: number;
  $width: number;
  $height: number;
}>`
  width: ${({ $width }) => `${$width}px`};
  height: auto;
  max-height: ${({ $height }) => `${$height}px`};
  border: 1px solid var(--theme-ink);
  background-color: var(--theme-paper);
  position: fixed;
  top: ${({ $yCoord }) => `${$yCoord}px`};
  left: ${({ $xCoord }) => `${$xCoord}px`};
  background: var(--theme-paper);
  z-index: 1;
  overflow-y: auto;
  padding: 1.25rem;
  ${prettyScrollbar()}
`;
