import styled, { css } from 'styled-components';

export const Container = styled.div<{ $isLightTheme: boolean }>`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  transition: transform 600ms ease-in-out;
  cursor: pointer;

  ${({ $isLightTheme }) =>
    $isLightTheme
      ? css`
          transform: rotate(50deg);
        `
      : css`
          transform: rotate(-20deg);
        `};
`;

export const Circle = styled.div`
  background-color: var(--theme-ink);
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const Mask = styled.div<{ $isLightTheme: boolean }>`
  transform-origin: 100% 100%;
  width: 85%;
  height: 85%;
  transition: transform 300ms ease-in-out;
  position: absolute;
  top: 0rem;
  right: -0.2rem;
  border-radius: 50%;
  background-color: var(--theme-paper);

  ${({ $isLightTheme }) =>
    $isLightTheme
      ? css`
          transform: scale(3) translate(6.25rem, 0px);
        `
      : css`
          transform: scale(1);
        `};
`;
