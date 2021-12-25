import styled from 'styled-components';
import { BodyS, BodySBold } from '$/styles/typography';
import Dot from '$/assets/icons/dot.svg';
import { Breakpoint, from, showFromMixin } from '$/styles/responsive';

export const Container = styled.header`
  border-block-start: 1px solid ${({ theme }) => theme.colors.ink}75;
  margin-block-end: 2rem;
  padding-block: 0.75rem;

  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;

  ${from.tabletPortrait} {
    grid-template-columns: repeat(2, 1fr) auto;
  }

  ${from.tabletLandscape} {
    grid-template-columns: repeat(3, 1fr) auto;
  }
`;

export const Text = styled(BodyS).attrs({ as: 'p' })``;

export const Link = styled(BodyS)`
  text-decoration: none;
  transition: color 300ms ease-out;
  display: inline;

  &:hover {
    color: blue;
  }
`;

export const Bold = styled(BodySBold).attrs({ as: 'span' })`
  display: block;
`;

export const Row = styled.div`
  gap: 1rem;
  display: flex;
  align-items: flex-start;

  ${Text} {
    line-height: 1.2;
  }
`;

export const Column = styled.div<{ $showFrom?: Breakpoint }>`
  flex-direction: column;

  ${Text} {
    line-height: 1.4;
  }

  ${({ $showFrom }) => showFromMixin($showFrom)}
`;

export const ThemeSwitcher = styled(Dot)`
  margin-block-start: 0.25rem;
`;
