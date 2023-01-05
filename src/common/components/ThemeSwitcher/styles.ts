import styled, { css } from 'styled-components';
import DefaultSunAndMoon from './sun-moon.svg';
import 'open-props/easings';

export const Button = styled.button`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: transparent;
  border: 0;
  padding: 0;

  border-radius: 50%;
  aspect-ratio: 1;

  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  outline-offset: 5px;

  & > svg {
    inline-size: 100%;
    block-size: 100%;
    stroke-linecap: round;
  }
`;

export const SunAndMoon = styled(DefaultSunAndMoon)<{ $isLightTheme: boolean }>`
  & > :is(.moon, .sun, .sun-beams) {
    transform-origin: center center;
  }

  & > :is(.moon, .sun) {
    fill: var(--theme-ink);
  }

  & > .sun-beams {
    stroke: var(--theme-ink);
    stroke-width: 1.5px;
  }

  ${({ $isLightTheme }) =>
    $isLightTheme
      ? css`
          & > .sun {
            transition: transform 0.5s var(--ease-elastic-3);
          }

          & > .sun-beams {
            transition: transform 0.5s var(--ease-elastic-4),
              opacity 0.5s var(--ease-3);
          }
        `
      : css`
          & > .sun {
            transform: scale(1.75);
            transition-timing-function: var(--ease-3);
            transition-duration: 0.25s;
          }

          & > .sun-beams {
            transform: rotateZ(-50deg);
            transition-duration: 0.15s;
            opacity: 0;
          }

          & > .moon > circle {
            transition-duration: 0.5s;
            transform: translateX(-7px);

            @supports (cx: 1) {
              transform: translateX(0);
              cx: 17;
            }
          }
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
          transform: scale(1) rotate(0);
        `};
`;
