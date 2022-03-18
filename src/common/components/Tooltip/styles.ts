import styled from 'styled-components';

export const Container = styled.span`
  position: relative;
`;

export const Box = styled.span<{
  $xCoord: number;
  $yCoord: number;
  $width: number;
  $height: number;
}>`
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};
  border: 1px solid var(--theme-ink);
  background-color: var(--theme-paper);
  position: absolute;
  top: ${({ $yCoord }) => `${$yCoord}px`};
  left: ${({ $xCoord }) => `${$xCoord}px`};
  padding: 1.25rem;
  background: whitesmoke;
  z-index: 1;
`;
