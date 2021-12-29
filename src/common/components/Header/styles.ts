import styled, { keyframes } from 'styled-components';
import { BodyS, BodySBold } from '$/styles/typography';
import { Breakpoint, from, showFromMixin } from '$/styles/responsive';
import DefaultBadge from '$/common/components/Badge';
import DefaultThemeSwitcher from '$/common/components/ThemeSwitcher';
import FadeInBlock from '../FadeInBlock';

const Translate = keyframes`
 0% {
    transform: scaleX(100%);
  }
  100% {
    transform:  scaleX(100%) translateX(100%) ;
  }
`;

export const Container = styled.header`
  padding-block: 0.75rem;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1.5rem;
  position: relative;
  overflow: hidden;
`;

export const AnimatedBorder = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;

  ${from.tabletPortrait} {
    gap: 3rem;
  }

  &:after {
    content: '';
    height: 1px;
    position: absolute;
    left: 0;
    background-color: var(--theme-paper);
    width: 100%;
    transform-origin: 0%;
    z-index: 1;
    top: 0;
    animation: ${Translate} 1300ms ease-in-out 200ms;
    animation-fill-mode: forwards;
  }

  &:before {
    content: '';
    height: 1px;
    position: absolute;
    left: 0;
    background-color: var(--theme-line);
    width: 100%;
  }
`;

export const Text = styled(BodyS).attrs({ as: 'p' })``;

export const ColumnsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: end;
  grid-column: 6/9;

  ${from.mobile} {
    justify-content: space-between;
    grid-column: 4/9;
  }

  ${from.tabletPortrait} {
    grid-column: 3/9;
  }
`;

export const Row = styled(FadeInBlock)`
  gap: 1rem;
  display: flex;
  align-items: flex-start;
  grid-column: 1/6;

  ${from.mobile} {
    grid-column: 1/4;
  }

  ${from.tabletPortrait} {
    grid-column: 1/3;
  }

  ${Text} {
    line-height: 1.2;
  }
`;

export const Column = styled.div<{ $showFrom?: Breakpoint }>`
  flex-direction: column;
  flex: 1 1 0px;

  ${({ $showFrom }) => showFromMixin($showFrom)}

  ${Text} {
    line-height: 1.4;
  }
`;

export const Bold = styled(BodySBold).attrs({ as: 'span' })`
  display: block;
`;

export const ThemeSwitcher = styled(DefaultThemeSwitcher)`
  margin-block-start: 0.25rem;
  flex-shrink: 0;
`;

export const Badge = styled(DefaultBadge)`
  display: flex;
  justify-self: flex-end;
  white-space: nowrap;
  flex-shrink: 0;
`;
