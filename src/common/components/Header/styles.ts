import styled from 'styled-components';
import { BodyS, BodySBold } from '$/styles/typography';
import Dot from '$/assets/icons/dot.svg';
import { Breakpoint, from, showFromMixin } from '$/styles/responsive';
import DefaultBadge from '$/common/components/Badge';

export const Container = styled.header`
  border-block-start: 1px solid ${({ theme }) => theme.colors.ink}75;
  padding-block: 0.75rem;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1.5rem;

  ${from.tabletPortrait} {
    gap: 3rem;
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

export const Row = styled.div`
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
  ${({ $showFrom }) => showFromMixin($showFrom)}

  ${Text} {
    line-height: 1.4;
  }
`;

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

export const ThemeSwitcher = styled(Dot)`
  margin-block-start: 0.25rem;
  flex-shrink: 0;
`;

export const Badge = styled(DefaultBadge)`
  display: flex;
  justify-self: flex-end;
  white-space: nowrap;
  flex-shrink: 0;
`;
