import type {
  DefaultTheme,
  FlattenInterpolation,
  ThemeProps,
} from 'styled-components';
import { css, keyframes } from 'styled-components';

export const maxWidth = css`
  width: 100%;
  max-width: 75rem;
  margin: 0 auto;
`;

const Translate = keyframes`
    0% {
        transform: translateX(-100%);
    }
    10% {
        transform: translateX(100%);
    }    
`;

export const ShineEffect = css`
  &:after {
    content: '';
    top: 0;
    transform: translateX(100%);
    width: 100%;
    height: 220px;
    position: absolute;
    z-index: 1;
    animation: ${Translate} 6s infinite 3s;

    background: -moz-linear-gradient(
      left,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(128, 186, 232, 0) 99%,
      rgba(125, 185, 232, 0) 100%
    ); /* FF3.6+ */
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(0%, rgba(255, 255, 255, 0)),
      color-stop(50%, rgba(255, 255, 255, 0.8)),
      color-stop(99%, rgba(128, 186, 232, 0)),
      color-stop(100%, rgba(125, 185, 232, 0))
    ); /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(
      left,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(128, 186, 232, 0) 99%,
      rgba(125, 185, 232, 0) 100%
    ); /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(
      left,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(128, 186, 232, 0) 99%,
      rgba(125, 185, 232, 0) 100%
    ); /* Opera 11.10+ */
    background: -ms-linear-gradient(
      left,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(128, 186, 232, 0) 99%,
      rgba(125, 185, 232, 0) 100%
    ); /* IE10+ */
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(128, 186, 232, 0) 99%,
      rgba(125, 185, 232, 0) 100%
    ); /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#007db9e8',GradientType=1 ); /* IE6-9 */
  }
`;

// Pretty Scrollbar
export const prettyScrollbar = (
  isVertical = true,
): FlattenInterpolation<ThemeProps<DefaultTheme>> => css`
  scrollbar-width: thin;
  scrollbar-color: var(--theme-ink) transparent;

  &::-webkit-scrollbar {
    ${isVertical
      ? css`
          width: 0.375rem;
        `
      : css`
          height: 0.375rem;
        `};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--theme-ink);
  }
`;
