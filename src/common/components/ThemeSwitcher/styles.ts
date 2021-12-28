import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  transition: transform 300ms ease-in-out;
`;

export const Circle = styled.div`
  background-color: ${({ theme }) => theme.colors.ink};
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
`;

export const Mask = styled.div<{ $isLightTheme: boolean }>`
  transform-origin: 100% 100%;
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 300ms ease-in-out;
  position: absolute;
  top: 0rem;
  right: -0.2rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.paper};

  ${({ $isLightTheme }) =>
    $isLightTheme
      ? css`
          transform: scale(3) translate(6.25rem, 0px);
        `
      : css`
          transform: scale(1) rotate(0);
        `};
`;
